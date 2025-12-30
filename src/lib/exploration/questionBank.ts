import { PageType, UserType, AnswerValue, Question } from "./types";

// Dynamic industry-specific questions for personalized AI guidance
export const QUESTIONS: Question[] = [
  // Step 1: Who are you?
  {
    id: "role",
    title: "What best describes your role?",
    helper: "This helps us personalize your AI journey",
    type: "single",
    options: [
      { label: "Founder / CEO", value: "FOUNDER" },
      { label: "CTO / Tech Leader", value: "TECH_LEADER" },
      { label: "Operations / Business Manager", value: "OPERATIONS" },
      { label: "Product Manager", value: "PRODUCT" },
      { label: "Exploring for my company", value: "EXPLORER" },
    ],
  },
  // Step 2: Industry selection
  {
    id: "industry",
    title: "Which industry are you in?",
    helper: "We'll show AI solutions relevant to your sector",
    type: "single",
    options: [
      { label: "Healthcare & Life Sciences", value: "HEALTHCARE" },
      { label: "Financial Services & Fintech", value: "FINTECH" },
      { label: "Retail & E-commerce", value: "RETAIL" },
      { label: "Logistics & Supply Chain", value: "LOGISTICS" },
      { label: "Real Estate & Property", value: "REAL_ESTATE" },
      { label: "Insurance", value: "INSURANCE" },
      { label: "Hospitality & Travel", value: "HOSPITALITY" },
      { label: "Education & EdTech", value: "EDTECH" },
      { label: "Other / Multiple", value: "OTHER" },
    ],
  },
  // Step 3: Company stage
  {
    id: "userType",
    title: "What stage is your business at?",
    helper: "This helps us recommend the right approach",
    type: "single",
    options: [
      { label: "Early-stage startup (Pre-seed to Series A)", value: "NEW_TO_AI" },
      { label: "Growth-stage company (Scaling operations)", value: "STARTUP" },
      { label: "Established SMB (50-500 employees)", value: "SMB" },
      { label: "Enterprise (500+ employees)", value: "ENTERPRISE" },
    ],
  },
  // Step 4: Primary AI goal
  {
    id: "primaryGoal",
    title: "What's your #1 goal for AI?",
    type: "single",
    options: [
      { label: "Automate repetitive tasks & save time", value: "TIME" },
      { label: "Improve customer experience (chat, voice, support)", value: "CX" },
      { label: "Make smarter decisions with data", value: "DECISIONS" },
      { label: "Connect & automate across tools", value: "WORKFLOWS" },
      { label: "Unlock knowledge from documents", value: "KNOWLEDGE" },
    ],
  },
  // Step 5: Industry-specific questions (Healthcare)
  {
    id: "healthcareUseCase",
    title: "Which healthcare challenge matters most?",
    type: "single",
    options: [
      { label: "Patient intake & scheduling automation", value: "INTAKE" },
      { label: "Clinical documentation & note-taking", value: "DOCUMENTATION" },
      { label: "Patient communication & follow-ups", value: "COMMUNICATION" },
      { label: "Claims processing & billing", value: "BILLING" },
      { label: "Medical research & data analysis", value: "RESEARCH" },
    ],
    when: ({ answers }) => answers.industry === "HEALTHCARE",
  },
  // Step 5: Industry-specific questions (Fintech)
  {
    id: "fintechUseCase",
    title: "Which fintech challenge matters most?",
    type: "single",
    options: [
      { label: "Fraud detection & risk assessment", value: "FRAUD" },
      { label: "Customer onboarding & KYC", value: "KYC" },
      { label: "Trading & portfolio analysis", value: "TRADING" },
      { label: "Customer support automation", value: "SUPPORT" },
      { label: "Regulatory compliance & reporting", value: "COMPLIANCE" },
    ],
    when: ({ answers }) => answers.industry === "FINTECH",
  },
  // Step 5: Industry-specific questions (Retail)
  {
    id: "retailUseCase",
    title: "Which retail challenge matters most?",
    type: "single",
    options: [
      { label: "Personalized product recommendations", value: "RECOMMENDATIONS" },
      { label: "Inventory & demand forecasting", value: "INVENTORY" },
      { label: "Customer service & chatbots", value: "SUPPORT" },
      { label: "Visual search & product discovery", value: "VISUAL" },
      { label: "Pricing optimization", value: "PRICING" },
    ],
    when: ({ answers }) => answers.industry === "RETAIL",
  },
  // Step 5: Industry-specific questions (Logistics)
  {
    id: "logisticsUseCase",
    title: "Which logistics challenge matters most?",
    type: "single",
    options: [
      { label: "Route optimization & planning", value: "ROUTES" },
      { label: "Demand forecasting & inventory", value: "FORECASTING" },
      { label: "Fleet management & tracking", value: "FLEET" },
      { label: "Warehouse automation", value: "WAREHOUSE" },
      { label: "Supplier & vendor management", value: "VENDORS" },
    ],
    when: ({ answers }) => answers.industry === "LOGISTICS",
  },
  // Step 5: Industry-specific questions (Real Estate)
  {
    id: "realEstateUseCase",
    title: "Which real estate challenge matters most?",
    type: "single",
    options: [
      { label: "Property valuation & market analysis", value: "VALUATION" },
      { label: "Lead qualification & follow-up", value: "LEADS" },
      { label: "Document processing & contracts", value: "DOCUMENTS" },
      { label: "Property matching & recommendations", value: "MATCHING" },
      { label: "Tenant communication & management", value: "TENANT" },
    ],
    when: ({ answers }) => answers.industry === "REAL_ESTATE",
  },
  // Step 5: Industry-specific questions (Insurance)
  {
    id: "insuranceUseCase",
    title: "Which insurance challenge matters most?",
    type: "single",
    options: [
      { label: "Claims processing & automation", value: "CLAIMS" },
      { label: "Underwriting & risk assessment", value: "UNDERWRITING" },
      { label: "Customer service & policy questions", value: "SERVICE" },
      { label: "Fraud detection", value: "FRAUD" },
      { label: "Policy document analysis", value: "DOCUMENTS" },
    ],
    when: ({ answers }) => answers.industry === "INSURANCE",
  },
  // Step 5: Industry-specific questions (Hospitality)
  {
    id: "hospitalityUseCase",
    title: "Which hospitality challenge matters most?",
    type: "single",
    options: [
      { label: "Guest communication & concierge", value: "CONCIERGE" },
      { label: "Booking & reservation management", value: "BOOKING" },
      { label: "Revenue & pricing optimization", value: "REVENUE" },
      { label: "Staff scheduling & operations", value: "OPERATIONS" },
      { label: "Review management & reputation", value: "REVIEWS" },
    ],
    when: ({ answers }) => answers.industry === "HOSPITALITY",
  },
  // Step 5: Industry-specific questions (EdTech)
  {
    id: "edtechUseCase",
    title: "Which education challenge matters most?",
    type: "single",
    options: [
      { label: "Personalized learning paths", value: "PERSONALIZED" },
      { label: "Content creation & curriculum", value: "CONTENT" },
      { label: "Student support & tutoring", value: "TUTORING" },
      { label: "Assessment & grading automation", value: "ASSESSMENT" },
      { label: "Administrative processes", value: "ADMIN" },
    ],
    when: ({ answers }) => answers.industry === "EDTECH",
  },
  // Step 5: Industry-specific questions (Other)
  {
    id: "otherUseCase",
    title: "What would help your business most?",
    type: "single",
    options: [
      { label: "Automate customer conversations", value: "CONVERSATIONS" },
      { label: "Process documents & extract data", value: "DOCUMENTS" },
      { label: "Analyze data & generate insights", value: "ANALYTICS" },
      { label: "Connect and automate workflows", value: "WORKFLOWS" },
      { label: "Build custom AI solutions", value: "CUSTOM" },
    ],
    when: ({ answers }) => answers.industry === "OTHER",
  },
  // Step 6: Current state
  {
    id: "currentState",
    title: "Where are you with AI today?",
    type: "single",
    options: [
      { label: "Just starting to explore", value: "EXPLORING" },
      { label: "Tested a few tools (ChatGPT, etc.)", value: "TESTED" },
      { label: "Have some AI in production", value: "PRODUCTION" },
      { label: "Looking to scale existing AI", value: "SCALING" },
    ],
  },
  // Step 7: Team size
  {
    id: "teamSize",
    title: "What's your team size?",
    type: "single",
    options: [
      { label: "1-10 people", value: "1-5" },
      { label: "11-50 people", value: "6-20" },
      { label: "51-200 people", value: "21-100" },
      { label: "200+ people", value: "100+" },
    ],
  },
  // Step 8: Timeline
  {
    id: "urgency",
    title: "When do you want to implement AI?",
    type: "single",
    options: [
      { label: "ASAP - We have an active project", value: "HIGH" },
      { label: "This quarter - Planning phase", value: "MEDIUM" },
      { label: "Exploring options for the future", value: "LOW" },
    ],
  },
];

export function getVisibleQuestions(
  pageType: PageType,
  userType: UserType | undefined,
  pageSlug: string | undefined,
  answers: Record<string, AnswerValue>
): Question[] {
  return QUESTIONS.filter(
    (q) => !q.when || q.when({ pageType, userType, pageSlug, answers })
  );
}

export function getNextQuestion(
  currentIndex: number,
  pageType: PageType,
  userType: UserType | undefined,
  pageSlug: string | undefined,
  answers: Record<string, AnswerValue>
): Question | null {
  const visible = getVisibleQuestions(pageType, userType, pageSlug, answers);
  return visible[currentIndex] || null;
}

// Helper to get human-readable answer labels for email
export function getAnswerLabel(questionId: string, value: string): string {
  const question = QUESTIONS.find(q => q.id === questionId);
  if (!question?.options) return value;
  const option = question.options.find(opt => opt.value === value);
  return option?.label || value;
}
