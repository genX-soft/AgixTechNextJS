'use client'
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MainHeader } from "@/components/main-header";
import { MainFooter } from "@/components/main-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function CompanyLogo({ company, logo, industryIcon: Icon }: { company: string; logo: string; industryIcon: React.ComponentType<{ className?: string }> }) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const getGradient = (name: string) => {
    const colors = [
      'from-emerald-500 to-teal-600',
      'from-blue-500 to-indigo-600',
      'from-purple-500 to-pink-600',
      'from-orange-500 to-red-600',
      'from-cyan-500 to-blue-600',
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  if (imgError || !logo) {
    return (
      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${getGradient(company)} flex items-center justify-center shrink-0`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    );
  }

  return (
    <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center overflow-hidden shrink-0 relative">
      {!imgLoaded && (
        <div className={`absolute inset-0 bg-gradient-to-br ${getGradient(company)} flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      )}
      <img
        src={logo}
        alt={`${company} logo`}
        className={`w-10 h-10 object-contain transition-opacity ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
        onError={() => setImgError(true)}
        onLoad={() => setImgLoaded(true)}
      />
    </div>
  );
}
import {
  ArrowRight,
  Building2,
  Stethoscope,
  ShoppingCart,
  GraduationCap,
  Plane,
  Briefcase,
  Brain,
  MessageSquare,
  Target,
  Bot,
  Search,
  Sparkles,
  ExternalLink,
  Mic,
  Music,
  UtensilsCrossed,
  Home,
  TrendingUp,
} from "lucide-react";

const categories = [
  { id: "all", label: "All Case Studies", icon: Sparkles },
  { id: "operational", label: "Operational Intelligence", icon: Target },
  { id: "conversational", label: "Conversational Intelligence", icon: MessageSquare },
  { id: "decision", label: "Decision Intelligence", icon: Brain },
  { id: "agentic", label: "Agentic AI Systems", icon: Bot },
  { id: "knowledge", label: "Enterprise Knowledge (RAG)", icon: Search },
];

const caseStudies = [
  {
    company: "Enova",
    logo: "https://logo.clearbit.com/enova.com",
    industry: "Fintech",
    industryIcon: Building2,
    category: ["Decision Intelligence", "Operational Intelligence"],
    oneLiner: "AI-powered credit decisioning system enabling faster, fairer lending at scale.",
    challenge: "Manual underwriting and rigid scoring models limiting approval speed and inclusivity.",
    result: "Faster loan approvals, improved risk accuracy, expanded credit access.",
    slug: "/case-studies/enova",
    metrics: [
      { label: "Approval Rate", before: "29%", after: "51%", improvement: "+76%" },
      { label: "Decision Time", before: "3.2 sec", after: "780 ms", improvement: "76% faster" },
      { label: "Default Rate", before: "8.3%", after: "4.1%", improvement: "-51%" },
      { label: "Fraud Detection", before: "-", after: "98.2%", improvement: "New capability" },
    ],
  },
  {
    company: "Dave",
    logo: "https://logo.clearbit.com/dave.com",
    industry: "Fintech",
    industryIcon: Building2,
    category: ["Conversational Intelligence", "Decision Intelligence"],
    oneLiner: "Generative AI assistant delivering human-like financial guidance to users.",
    challenge: "High support load and lack of personalized financial advice at scale.",
    result: "Reduced support dependency and improved user engagement with AI-driven assistance.",
    slug: "/case-studies/dave",
    metrics: [
      { label: "First Response Time", before: "6.5 min", after: "1.2 min", improvement: "82% faster" },
      { label: "Support Tickets (Tier 1)", before: "89K/mo", after: "38K/mo", improvement: "-57%" },
      { label: "Resolution Time", before: "4.4 min", after: "55 sec", improvement: "79% faster" },
      { label: "CSAT Score", before: "78/100", after: "93/100", improvement: "+19%" },
    ],
  },
  {
    company: "Ocrolus",
    logo: "https://logo.clearbit.com/ocrolus.com",
    industry: "Fintech",
    industryIcon: Building2,
    category: ["Enterprise Knowledge Intelligence", "Operational Intelligence"],
    oneLiner: "AI document intelligence engine for automated financial workflows.",
    challenge: "Manual document review slowing down fintech operations.",
    result: "Significant reduction in processing time and operational cost.",
    slug: "/case-studies/ocrolus",
    metrics: [
      { label: "Document Processing Time", before: "9.4 min", after: "1.6 min", improvement: "83% faster" },
      { label: "Manual Review Dependency", before: "87%", after: "38%", improvement: "-56%" },
      { label: "Data Extraction Accuracy", before: "91.5%", after: "99.2%", improvement: "+8.4%" },
      { label: "Loan Approval Turnaround", before: "2.6 days", after: "0.8 days", improvement: "69% faster" },
    ],
  },
  {
    company: "Babylon Health",
    logo: "https://logo.clearbit.com/babylonhealth.com",
    industry: "Healthcare",
    industryIcon: Stethoscope,
    category: ["Conversational Intelligence", "Decision Intelligence"],
    oneLiner: "AI-driven patient intake, symptom triage, and care routing at scale.",
    challenge: "Overloaded healthcare systems with inefficient triage and routing.",
    result: "Improved patient flow, faster triage, and optimized clinician workload.",
    slug: "/case-studies/babylon-health",
    metrics: [
      { label: "Triage Accuracy", before: "76%", after: "94%", improvement: "+24%" },
      { label: "Patient Wait Time", before: "45 min", after: "8 min", improvement: "82% faster" },
      { label: "Clinician Utilization", before: "58%", after: "89%", improvement: "+53%" },
      { label: "Patient Satisfaction", before: "71/100", after: "91/100", improvement: "+28%" },
    ],
  },
  {
    company: "Kite Therapy",
    logo: "https://logo.clearbit.com/kitetherapy.com",
    industry: "Healthcare",
    industryIcon: Stethoscope,
    category: ["Decision Intelligence", "Agentic AI Systems"],
    oneLiner: "AI matchmaking engine connecting children to the right therapy providers.",
    challenge: "Manual therapist matching causing delays in care delivery.",
    result: "Faster placement and better therapy outcomes for families.",
    slug: "/case-studies/kite-therapy",
    metrics: [
      { label: "Wait Time for First Match", before: "6-9 weeks", after: "<10 days", improvement: "85% faster" },
      { label: "No-Show Rate", before: "18%", after: "7.4%", improvement: "-59%" },
      { label: "Parent Satisfaction", before: "74/100", after: "92/100", improvement: "+24%" },
      { label: "Therapy Match Success", before: "61%", after: "84%", improvement: "+38%" },
    ],
  },
  {
    company: "Hello Driven",
    logo: "https://logo.clearbit.com/hellodriven.com",
    industry: "Healthcare",
    industryIcon: Stethoscope,
    category: ["Conversational Intelligence", "Agentic AI Systems"],
    oneLiner: "AI-powered mental resilience coach for scalable emotional wellbeing.",
    challenge: "Limited access to personalized mental health support.",
    result: "Always-on AI coaching with improved engagement and reach.",
    slug: "/case-studies/hello-driven",
    metrics: [
      { label: "User Engagement", before: "2.1 sessions/week", after: "5.8 sessions/week", improvement: "+176%" },
      { label: "Response Time", before: "24-48 hrs", after: "Instant", improvement: "100% faster" },
      { label: "User Retention (30-day)", before: "34%", after: "72%", improvement: "+112%" },
      { label: "Mental Wellness Score", before: "62/100", after: "81/100", improvement: "+31%" },
    ],
  },
  {
    company: "Albertsons",
    logo: "https://logo.clearbit.com/albertsons.com",
    industry: "Retail",
    industryIcon: ShoppingCart,
    category: ["Operational Intelligence", "Decision Intelligence"],
    oneLiner: "AI-driven consumer behavior analytics for predictive restocking.",
    challenge: "Stockouts and overstocking due to static demand planning.",
    result: "Improved inventory accuracy and reduced waste.",
    slug: "/case-studies/albertsons",
    metrics: [
      { label: "Out-of-Stock Rate (Top 100 SKUs)", before: "18%", after: "6.3%", improvement: "-65%" },
      { label: "Repeat Purchase Conversion", before: "27%", after: "72%", improvement: "+167%" },
      { label: "Promotion Response Rate", before: "12%", after: "33%", improvement: "+175%" },
      { label: "Customer Satisfaction", before: "71/100", after: "88/100", improvement: "+24%" },
    ],
  },
  {
    company: "Kroger",
    logo: "https://logo.clearbit.com/kroger.com",
    industry: "Retail",
    industryIcon: ShoppingCart,
    category: ["Operational Intelligence", "Decision Intelligence"],
    oneLiner: "Predictive AI engine enabling smart reordering and cart automation.",
    challenge: "Inefficient replenishment impacting customer experience.",
    result: "Optimized ordering cycles and higher cart completion rates.",
    slug: "/case-studies/kroger",
    metrics: [
      { label: "Cart Completion Rate", before: "61%", after: "84%", improvement: "+38%" },
      { label: "Reorder Prediction Accuracy", before: "67%", after: "91%", improvement: "+36%" },
      { label: "Inventory Turnover", before: "12x/year", after: "18x/year", improvement: "+50%" },
      { label: "Customer Lifetime Value", before: "$420", after: "$680", improvement: "+62%" },
    ],
  },
  {
    company: "Stitch Fix",
    logo: "https://logo.clearbit.com/stitchfix.com",
    industry: "Retail",
    industryIcon: ShoppingCart,
    category: ["Decision Intelligence", "Agentic AI Systems"],
    oneLiner: "AI stylist engine delivering hyper-personalized fashion recommendations.",
    challenge: "Scaling personal styling without increasing human cost.",
    result: "Higher customer satisfaction and repeat purchases.",
    slug: "/case-studies/stitch-fix",
    metrics: [
      { label: "Styling Accuracy", before: "52%", after: "78%", improvement: "+50%" },
      { label: "Keep Rate", before: "64%", after: "86%", improvement: "+34%" },
      { label: "Stylist Productivity", before: "45 clients/day", after: "180 clients/day", improvement: "+300%" },
      { label: "Return Rate", before: "42%", after: "18%", improvement: "-57%" },
    ],
  },
  {
    company: "Ulta Beauty",
    logo: "https://logo.clearbit.com/ulta.com",
    industry: "Retail",
    industryIcon: ShoppingCart,
    category: ["Decision Intelligence", "Conversational Intelligence"],
    oneLiner: "Predictive AI engine for personalized marketing and loyalty engagement.",
    challenge: "Generic campaigns failing to convert diverse customer segments.",
    result: "Increased engagement and loyalty program effectiveness.",
    slug: "/case-studies/ulta-beauty",
    metrics: [
      { label: "Campaign Conversion Rate", before: "3.2%", after: "8.7%", improvement: "+172%" },
      { label: "Loyalty Program Engagement", before: "41%", after: "74%", improvement: "+80%" },
      { label: "Average Order Value", before: "$52", after: "$78", improvement: "+50%" },
      { label: "Customer Churn Rate", before: "28%", after: "12%", improvement: "-57%" },
    ],
  },
  {
    company: "Quizlet",
    logo: "https://logo.clearbit.com/quizlet.com",
    industry: "Education",
    industryIcon: GraduationCap,
    category: ["Decision Intelligence", "Agentic AI Systems"],
    oneLiner: "AI-powered study engine for predictive and personalized learning.",
    challenge: "One-size-fits-all learning paths reducing retention.",
    result: "Adaptive learning experiences with improved outcomes.",
    slug: "/case-studies/quizlet",
    metrics: [
      { label: "Study Session Completion", before: "53%", after: "78%", improvement: "+47%" },
      { label: "Test Score Improvement", before: "+5.6%", after: "+13.9%", improvement: "+148%" },
      { label: "Flashcard Retention (24hrs)", before: "58%", after: "83%", improvement: "+43%" },
      { label: "User Satisfaction", before: "74/100", after: "91/100", improvement: "+23%" },
    ],
  },
  {
    company: "Knewton",
    logo: "https://logo.clearbit.com/knewton.com",
    industry: "Education",
    industryIcon: GraduationCap,
    category: ["Decision Intelligence"],
    oneLiner: "Real-time adaptive learning powered by continuous AI feedback loops.",
    challenge: "Static curricula unable to adapt to individual learner needs.",
    result: "Highly personalized education journeys.",
    slug: "/case-studies/knewton",
    metrics: [
      { label: "Learning Path Personalization", before: "12%", after: "94%", improvement: "+683%" },
      { label: "Course Completion Rate", before: "34%", after: "71%", improvement: "+109%" },
      { label: "Knowledge Retention", before: "41%", after: "78%", improvement: "+90%" },
      { label: "Time to Mastery", before: "6.2 weeks", after: "3.1 weeks", improvement: "50% faster" },
    ],
  },
  {
    company: "Riiid Labs",
    logo: "https://logo.clearbit.com/riiid.com",
    industry: "Education",
    industryIcon: GraduationCap,
    category: ["Decision Intelligence"],
    oneLiner: "Adaptive AI engine for test mastery and learning optimization.",
    challenge: "Poor exam readiness due to lack of adaptive feedback.",
    result: "Improved learner performance and accuracy.",
    slug: "/case-studies/riiid-labs",
    metrics: [
      { label: "Score Improvement", before: "+45 pts", after: "+124 pts", improvement: "+176%" },
      { label: "Study Time Efficiency", before: "100 hrs", after: "42 hrs", improvement: "58% faster" },
      { label: "Question Accuracy", before: "61%", after: "89%", improvement: "+46%" },
      { label: "Pass Rate", before: "67%", after: "94%", improvement: "+40%" },
    ],
  },
  {
    company: "Hilton Hotels",
    logo: "https://logo.clearbit.com/hilton.com",
    industry: "Hospitality",
    industryIcon: Plane,
    category: ["Conversational Intelligence", "Decision Intelligence"],
    oneLiner: "Enterprise AI for end-to-end guest personalization.",
    challenge: "Fragmented guest data across systems.",
    result: "Personalized experiences and improved guest satisfaction.",
    slug: "/case-studies/hilton-hotels",
    metrics: [
      { label: "Guest Satisfaction", before: "78/100", after: "92/100", improvement: "+18%" },
      { label: "Personalization Accuracy", before: "34%", after: "87%", improvement: "+156%" },
      { label: "Upsell Conversion", before: "8%", after: "23%", improvement: "+188%" },
      { label: "Repeat Booking Rate", before: "41%", after: "67%", improvement: "+63%" },
    ],
  },
  {
    company: "HouseCanary",
    logo: "https://logo.clearbit.com/housecanary.com",
    industry: "Real Estate",
    industryIcon: Building2,
    category: ["Decision Intelligence"],
    oneLiner: "AI platform for real-time real estate valuation and market insights.",
    challenge: "Inaccurate and delayed property valuations.",
    result: "More accurate pricing and faster decision-making.",
    slug: "/case-studies/housecanary",
    metrics: [
      { label: "Valuation Accuracy", before: "89%", after: "97.4%", improvement: "+9.4%" },
      { label: "Time to Valuation", before: "3-5 days", after: "< 1 hour", improvement: "99% faster" },
      { label: "Market Prediction Accuracy", before: "71%", after: "92%", improvement: "+30%" },
      { label: "Analyst Productivity", before: "8 valuations/day", after: "45 valuations/day", improvement: "+463%" },
    ],
  },
  {
    company: "Mindtrip",
    logo: "https://logo.clearbit.com/mindtrip.ai",
    industry: "Travel",
    industryIcon: Plane,
    category: ["Conversational Intelligence"],
    oneLiner: "Conversational AI for effortless travel ideation and planning.",
    challenge: "Complex travel planning overwhelming users.",
    result: "Faster itinerary creation and higher engagement.",
    slug: "/case-studies/mindtrip",
    metrics: [
      { label: "Itinerary Creation Time", before: "4.5 hours", after: "12 min", improvement: "96% faster" },
      { label: "User Engagement", before: "2.3 sessions", after: "7.8 sessions", improvement: "+239%" },
      { label: "Booking Conversion", before: "8%", after: "31%", improvement: "+288%" },
      { label: "User Satisfaction", before: "68/100", after: "94/100", improvement: "+38%" },
    ],
  },
  {
    company: "PolyAI",
    logo: "https://logo.clearbit.com/poly.ai",
    industry: "Voice AI",
    industryIcon: Mic,
    category: ["Conversational Intelligence", "Agentic AI Systems"],
    oneLiner: "Multilingual voice AI assistant delivering human-like customer service at enterprise scale.",
    challenge: "High call volumes and inconsistent customer experience across regions.",
    result: "24/7 automated voice support with improved resolution rates and lower support costs.",
    slug: "/case-studies/polyai",
    metrics: [
      { label: "Call Resolution Rate", before: "62%", after: "89%", improvement: "+44%" },
      { label: "Average Handle Time", before: "8.2 min", after: "3.1 min", improvement: "62% faster" },
      { label: "Customer Satisfaction", before: "72/100", after: "91/100", improvement: "+26%" },
      { label: "Support Cost per Call", before: "$12.40", after: "$3.20", improvement: "-74%" },
    ],
  },
  {
    company: "Brainfish",
    logo: "https://logo.clearbit.com/brainfi.sh",
    industry: "Voice AI",
    industryIcon: Mic,
    category: ["Conversational Intelligence", "Enterprise Knowledge Intelligence"],
    oneLiner: "Domain-specific AI chatbot enabling instant, high-accuracy customer support.",
    challenge: "Slow ticket resolution and overdependence on human agents.",
    result: "Faster self-service resolution and reduced support workload.",
    slug: "/case-studies/brainfish",
    metrics: [
      { label: "Self-Service Resolution", before: "23%", after: "78%", improvement: "+239%" },
      { label: "Response Accuracy", before: "71%", after: "96%", improvement: "+35%" },
      { label: "Ticket Volume Reduction", before: "-", after: "-52%", improvement: "-52%" },
      { label: "Time to Resolution", before: "4.2 hrs", after: "3 min", improvement: "99% faster" },
    ],
  },
  {
    company: "Properti AI",
    logo: "https://logo.clearbit.com/properti.ai",
    industry: "Real Estate",
    industryIcon: Home,
    category: ["Conversational Intelligence", "Decision Intelligence"],
    oneLiner: "AI chatbot for personalized property discovery and buyer engagement.",
    challenge: "Manual lead handling and poor personalization in property search.",
    result: "Higher-quality leads and faster buyer decision cycles.",
    slug: "/case-studies/properti-ai",
    metrics: [
      { label: "Lead Quality Score", before: "42/100", after: "81/100", improvement: "+93%" },
      { label: "Response Time", before: "4.2 hours", after: "< 30 sec", improvement: "99% faster" },
      { label: "Property Match Accuracy", before: "34%", after: "87%", improvement: "+156%" },
      { label: "Conversion to Viewing", before: "12%", after: "38%", improvement: "+217%" },
    ],
  },
  {
    company: "Dartmouth College",
    logo: "https://logo.clearbit.com/dartmouth.edu",
    industry: "Education",
    industryIcon: GraduationCap,
    category: ["Conversational Intelligence", "Operational Intelligence"],
    oneLiner: "24/7 AI helpdesk assistant for campus-wide IT support.",
    challenge: "High IT support demand outside office hours.",
    result: "Always-on IT assistance and reduced helpdesk backlog.",
    slug: "/case-studies/dartmouth-college",
    metrics: [
      { label: "Ticket Deflection Rate", before: "-", after: "67%", improvement: "New capability" },
      { label: "After-Hours Resolution", before: "0%", after: "78%", improvement: "+100%" },
      { label: "Avg. Resolution Time", before: "18 hours", after: "4.2 hours", improvement: "77% faster" },
      { label: "Student Satisfaction", before: "64/100", after: "89/100", improvement: "+39%" },
    ],
  },
  {
    company: "Suno",
    logo: "https://logo.clearbit.com/suno.ai",
    industry: "Creative AI",
    industryIcon: Music,
    category: ["Agentic AI Systems", "Decision Intelligence"],
    oneLiner: "Text-to-music AI engine enabling instant audio composition.",
    challenge: "Complex music creation workflows limiting creative experimentation.",
    result: "Rapid content creation and democratized music production.",
    slug: "/case-studies/suno",
    metrics: [
      { label: "Time to First Track", before: "2-4 weeks", after: "< 2 min", improvement: "99% faster" },
      { label: "User Creations/Month", before: "-", after: "14M+", improvement: "New capability" },
      { label: "Creative Iterations", before: "3-5 versions", after: "50+ versions", improvement: "+900%" },
      { label: "User Retention", before: "-", after: "78%", improvement: "Industry-leading" },
    ],
  },
  {
    company: "Innit",
    logo: "https://logo.clearbit.com/innit.com",
    industry: "Food & Lifestyle",
    industryIcon: UtensilsCrossed,
    category: ["Decision Intelligence", "Operational Intelligence"],
    oneLiner: "AI sous-chef delivering personalized cooking guidance and pantry intelligence.",
    challenge: "Disconnected food planning, shopping, and cooking experiences.",
    result: "Personalized meal guidance and reduced food waste.",
    slug: "/case-studies/innit",
    metrics: [
      { label: "Food Waste Reduction", before: "-", after: "-34%", improvement: "-34%" },
      { label: "Meal Planning Time", before: "45 min/week", after: "8 min/week", improvement: "82% faster" },
      { label: "Recipe Personalization", before: "12%", after: "89%", improvement: "+642%" },
      { label: "User Engagement", before: "1.8x/week", after: "5.4x/week", improvement: "+200%" },
    ],
  },
  {
    company: "Hungryroot",
    logo: "https://logo.clearbit.com/hungryroot.com",
    industry: "Food & Lifestyle",
    industryIcon: UtensilsCrossed,
    category: ["Decision Intelligence", "Operational Intelligence"],
    oneLiner: "AI-driven meal planning and grocery customization platform.",
    challenge: "Generic meal plans failing to match dietary preferences.",
    result: "Higher customer retention and personalized nutrition journeys.",
    slug: "/case-studies/hungryroot",
    metrics: [
      { label: "Meal Match Accuracy", before: "54%", after: "91%", improvement: "+69%" },
      { label: "Customer Retention (6-mo)", before: "38%", after: "72%", improvement: "+89%" },
      { label: "Order Customization Rate", before: "23%", after: "87%", improvement: "+278%" },
      { label: "Customer Satisfaction", before: "71/100", after: "92/100", improvement: "+30%" },
    ],
  },
  {
    company: "Navan",
    logo: "https://logo.clearbit.com/navan.com",
    industry: "Travel",
    industryIcon: Plane,
    category: ["Conversational Intelligence", "Decision Intelligence"],
    oneLiner: "AI assistant for business travel planning and smart expense management.",
    challenge: "Manual expense reporting and fragmented travel workflows.",
    result: "Streamlined travel booking and faster expense reconciliation.",
    slug: "/case-studies/navan",
    metrics: [
      { label: "Expense Processing Time", before: "3.2 hours", after: "12 min", improvement: "94% faster" },
      { label: "Policy Compliance", before: "67%", after: "94%", improvement: "+40%" },
      { label: "Booking Time", before: "45 min", after: "4 min", improvement: "91% faster" },
      { label: "Cost Savings", before: "-", after: "23%", improvement: "+23% savings" },
    ],
  },
  {
    company: "GeoVea",
    logo: "https://logo.clearbit.com/geovea.com",
    industry: "Travel",
    industryIcon: Plane,
    category: ["Conversational Intelligence"],
    oneLiner: "Dynamic AI assistant for tailored travel itineraries.",
    challenge: "Time-consuming itinerary planning with low personalization.",
    result: "Highly personalized travel plans generated instantly.",
    slug: "/case-studies/geovea",
    metrics: [
      { label: "Itinerary Creation Time", before: "6+ hours", after: "< 5 min", improvement: "99% faster" },
      { label: "Personalization Score", before: "34/100", after: "91/100", improvement: "+168%" },
      { label: "User Satisfaction", before: "62/100", after: "94/100", improvement: "+52%" },
      { label: "Repeat Usage", before: "18%", after: "67%", improvement: "+272%" },
    ],
  },
  {
    company: "Luxury Escapes",
    logo: "https://logo.clearbit.com/luxuryescapes.com",
    industry: "Travel",
    industryIcon: Plane,
    category: ["Conversational Intelligence", "Agentic AI Systems"],
    oneLiner: "Concierge-grade AI chatbot for premium travel experiences.",
    challenge: "Scaling high-touch concierge service globally.",
    result: "Luxury-grade personalization delivered at scale.",
    slug: "/case-studies/luxury-escapes",
    metrics: [
      { label: "Concierge Capacity", before: "120 guests/day", after: "4,500 guests/day", improvement: "+3,650%" },
      { label: "Response Time", before: "2.4 hours", after: "< 30 sec", improvement: "99% faster" },
      { label: "Booking Value (Avg)", before: "$2,400", after: "$4,100", improvement: "+71%" },
      { label: "Guest Satisfaction", before: "81/100", after: "96/100", improvement: "+19%" },
    ],
  },
  {
    company: "Naratix",
    logo: "https://logo.clearbit.com/naratix.ai",
    industry: "Retail",
    industryIcon: ShoppingCart,
    category: ["Agentic AI Systems", "Enterprise Knowledge Intelligence"],
    oneLiner: "Intelligent AI agents for multilingual e-commerce content creation.",
    challenge: "Manual product content creation across global markets.",
    result: "Faster content localization and improved conversion.",
    slug: "/case-studies/naratix",
    metrics: [
      { label: "Content Creation Time", before: "4.5 hours/product", after: "12 min/product", improvement: "96% faster" },
      { label: "Language Coverage", before: "3 languages", after: "28 languages", improvement: "+833%" },
      { label: "Content Consistency", before: "62%", after: "98%", improvement: "+58%" },
      { label: "Conversion Rate", before: "2.1%", after: "4.8%", improvement: "+129%" },
    ],
  },
  {
    company: "AlphaSense",
    logo: "https://logo.clearbit.com/alphasense.com",
    industry: "Market Intelligence",
    industryIcon: TrendingUp,
    category: ["Enterprise Knowledge Intelligence", "Decision Intelligence"],
    oneLiner: "Real-time AI engine for market intelligence and research automation.",
    challenge: "Slow manual research across fragmented data sources.",
    result: "Faster insights and improved strategic decision-making.",
    slug: "/case-studies/alphasense",
    metrics: [
      { label: "Research Time", before: "8+ hours", after: "< 15 min", improvement: "97% faster" },
      { label: "Data Sources Analyzed", before: "12", after: "10,000+", improvement: "+83,233%" },
      { label: "Insight Accuracy", before: "71%", after: "94%", improvement: "+32%" },
      { label: "Analyst Productivity", before: "3 reports/week", after: "18 reports/week", improvement: "+500%" },
    ],
  },
];

const categoryMapping: Record<string, string> = {
  operational: "Operational Intelligence",
  conversational: "Conversational Intelligence",
  decision: "Decision Intelligence",
  agentic: "Agentic AI Systems",
  knowledge: "Enterprise Knowledge Intelligence",
};

export default function CaseStudiesPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredCaseStudies = activeFilter === "all"
    ? caseStudies
    : caseStudies.filter((cs) =>
        cs.category.some((cat) =>
          cat.toLowerCase().includes(categoryMapping[activeFilter]?.toLowerCase() || activeFilter)
        )
      );

  const getCategoryColor = (category: string) => {
    if (category.includes("Operational")) return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    if (category.includes("Conversational")) return "bg-green-500/20 text-green-400 border-green-500/30";
    if (category.includes("Decision")) return "bg-purple-500/20 text-purple-400 border-purple-500/30";
    if (category.includes("Agentic")) return "bg-orange-500/20 text-orange-400 border-orange-500/30";
    if (category.includes("Knowledge")) return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30";
    return "bg-muted text-muted-foreground";
  };

  const getIndustryColor = (industry: string) => {
    switch (industry) {
      case "Fintech": return "text-emerald-400";
      case "Healthcare": return "text-red-400";
      case "Retail": return "text-amber-400";
      case "Education": return "text-blue-400";
      case "Hospitality": return "text-purple-400";
      case "Real Estate": return "text-cyan-400";
      case "Travel": return "text-pink-400";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <MainHeader />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center pt-24 lg:pt-28 pb-16 overflow-hidden bg-gradient-to-br from-background via-primary/5 to-cyan-500/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <Badge variant="outline" className="border-primary/30 text-primary">
              <Briefcase className="w-3 h-3 mr-1" />
              Case Studies
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Real-World AI Systems.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-primary">
                Proven at Enterprise Scale.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto">
              Explore how AGIX engineers Operational, Conversational, Decision, and Agentic Intelligence
              across healthcare, finance, retail, education, travel, and global enterprises —
              not as features, but as production-ready systems.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="case-studies" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Filter Tabs */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  variant={activeFilter === cat.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter(cat.id)}
                  className="gap-2"
                  data-testid={`filter-${cat.id}`}
                >
                  <cat.icon className="w-4 h-4" />
                  {cat.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="text-center mb-8">
            <p className="text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filteredCaseStudies.length}</span> case studies
              {activeFilter !== "all" && (
                <span> in <span className="text-primary">{categories.find(c => c.id === activeFilter)?.label}</span></span>
              )}
            </p>
          </div>

          {/* Case Study Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredCaseStudies.map((cs, index) => (
                <motion.div
                  key={cs.company}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="h-full hover-elevate border-border/50 group" data-testid={`card-case-study-${cs.company.toLowerCase().replace(/\s+/g, '-')}`}>
                    <CardContent className="p-6 space-y-4">
                      {/* Header: Logo + Company + Industry */}
                      <div className="flex items-start gap-4">
                        <CompanyLogo 
                          company={cs.company} 
                          logo={cs.logo} 
                          industryIcon={cs.industryIcon} 
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-lg truncate">{cs.company}</h3>
                          <div className={`flex items-center gap-1 text-sm ${getIndustryColor(cs.industry)}`}>
                            <cs.industryIcon className="w-3 h-3" />
                            <span>{cs.industry}</span>
                          </div>
                        </div>
                      </div>

                      {/* Categories */}
                      <div className="flex flex-wrap gap-1">
                        {cs.category.map((cat, i) => (
                          <Badge key={i} variant="outline" className={`text-xs ${getCategoryColor(cat)}`}>
                            {cat.replace(" Intelligence", "").replace(" AI Systems", "")}
                          </Badge>
                        ))}
                      </div>

                      {/* One-liner */}
                      <p className="text-sm font-medium text-foreground">
                        {cs.oneLiner}
                      </p>

                      {/* Challenge */}
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Challenge</p>
                        <p className="text-sm text-muted-foreground">{cs.challenge}</p>
                      </div>

                      {/* Result */}
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-green-500 uppercase tracking-wide">Result</p>
                        <p className="text-sm text-foreground">{cs.result}</p>
                      </div>

                      {/* Quantified Impact Strip (if available) */}
                      {"metrics" in cs && cs.metrics && (
                        <div className="mt-3 p-4 rounded-lg bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700">
                          <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-3 text-center font-medium">Quantified Impact</p>
                          <div className="grid grid-cols-2 gap-4">
                            {(cs.metrics as Array<{label: string; before: string; after: string; improvement: string}>).slice(0, 2).map((metric, i) => (
                              <div key={i} className="text-center">
                                <p className="text-xl font-bold text-white">{metric.after}</p>
                                <p className="text-[10px] text-slate-500 line-through">{metric.before}</p>
                                <p className="text-[10px] text-slate-400 mt-1 leading-tight">{metric.label}</p>
                                <Badge className="mt-1.5 bg-green-500/20 text-green-400 border-green-500/30 text-[9px] px-1.5">
                                  {metric.improvement}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* View Details Link */}
                      <div className="pt-2">
                        {"slug" in cs && cs.slug ? (
                          <Button variant="outline" size="sm" className="w-full border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground hover:border-primary" asChild>
                            <a href={cs.slug as string} data-testid={`button-view-${cs.company.toLowerCase().replace(/\s+/g, '-')}`}>
                              Read Full Case Study
                              <ArrowRight className="w-3 h-3 ml-2" />
                            </a>
                          </Button>
                        ) : (
                          <Button variant="ghost" size="sm" className="w-full group-hover:text-primary" asChild>
                            <a href="#contact" data-testid={`button-view-${cs.company.toLowerCase().replace(/\s+/g, '-')}`}>
                              Learn More
                              <ExternalLink className="w-3 h-3 ml-2" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-primary/10 via-background to-cyan-500/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Badge className="mb-4">
              <Sparkles className="w-3 h-3 mr-1" />
              Production-Ready AI
            </Badge>

            <h2 className="text-3xl md:text-4xl font-bold">
              These Aren't Demos.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-primary">
                These Are Deployed AI Systems.
              </span>
            </h2>

            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Every case study represents a production AI system engineered for scale, compliance, and real business impact —
              across voice, agents, prediction, automation, and intelligence layers.
            </p>

            <div className="pt-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                <a href="/" data-testid="button-cta-build">
                  Build Your AI System with AGIX
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer spacer */}
      <div className="py-10" />

      <MainFooter />
    </div>
  );
}
