export interface GlossaryTerm {
  term: string;
  definition: string;
  category: "fundamentals" | "techniques" | "applications" | "business";
  aliases?: string[];
}

export const AI_GLOSSARY: GlossaryTerm[] = [
  // Fundamentals
  {
    term: "Artificial Intelligence",
    definition: "Technology that enables machines to simulate human intelligence, including learning, reasoning, and problem-solving.",
    category: "fundamentals",
    aliases: ["AI", "A.I."],
  },
  {
    term: "Machine Learning",
    definition: "A subset of AI where systems learn and improve from experience without being explicitly programmed.",
    category: "fundamentals",
    aliases: ["ML"],
  },
  {
    term: "Deep Learning",
    definition: "A type of machine learning using neural networks with multiple layers to analyze complex patterns in data.",
    category: "fundamentals",
  },
  {
    term: "Neural Network",
    definition: "A computing system inspired by biological neural networks, designed to recognize patterns and make decisions.",
    category: "fundamentals",
    aliases: ["Neural Networks"],
  },
  {
    term: "Large Language Model",
    definition: "AI models trained on vast amounts of text data that can understand and generate human-like text.",
    category: "fundamentals",
    aliases: ["LLM", "LLMs"],
  },
  {
    term: "Natural Language Processing",
    definition: "AI technology that enables computers to understand, interpret, and respond to human language.",
    category: "fundamentals",
    aliases: ["NLP"],
  },
  {
    term: "Generative AI",
    definition: "AI systems that can create new content including text, images, code, and more based on learned patterns.",
    category: "fundamentals",
    aliases: ["GenAI", "Gen AI"],
  },
  
  // Techniques
  {
    term: "Prompt Engineering",
    definition: "The practice of crafting effective instructions for AI models to get optimal results.",
    category: "techniques",
  },
  {
    term: "Fine-tuning",
    definition: "Customizing a pre-trained AI model with your specific data to improve performance for particular tasks.",
    category: "techniques",
  },
  {
    term: "RAG",
    definition: "Retrieval-Augmented Generation - A technique that enhances AI responses by retrieving relevant information from your data sources.",
    category: "techniques",
    aliases: ["Retrieval-Augmented Generation"],
  },
  {
    term: "Embeddings",
    definition: "Numerical representations of text or data that capture semantic meaning, enabling AI to understand relationships.",
    category: "techniques",
  },
  {
    term: "Vector Database",
    definition: "A specialized database optimized for storing and searching AI embeddings for fast similarity matching.",
    category: "techniques",
    aliases: ["Vector DB"],
  },
  {
    term: "Computer Vision",
    definition: "AI technology that enables machines to interpret and understand visual information from images and videos.",
    category: "techniques",
  },
  
  // Applications
  {
    term: "Chatbot",
    definition: "An AI-powered conversational interface that can answer questions and assist users automatically.",
    category: "applications",
    aliases: ["Chat Bot", "Chatbots"],
  },
  {
    term: "AI Agent",
    definition: "An autonomous AI system that can perform tasks, make decisions, and take actions on behalf of users.",
    category: "applications",
    aliases: ["AI Agents", "Agentic AI"],
  },
  {
    term: "Workflow Automation",
    definition: "Using AI to automatically execute business processes, reducing manual work and improving efficiency.",
    category: "applications",
  },
  {
    term: "Intelligent Document Processing",
    definition: "AI technology that extracts, classifies, and processes information from documents automatically.",
    category: "applications",
    aliases: ["IDP", "Document AI"],
  },
  {
    term: "Predictive Analytics",
    definition: "Using AI to analyze historical data and predict future outcomes, trends, or behaviors.",
    category: "applications",
  },
  {
    term: "Sentiment Analysis",
    definition: "AI technique that determines the emotional tone behind text, useful for understanding customer feedback.",
    category: "applications",
  },
  {
    term: "Conversational AI",
    definition: "AI systems designed for natural, human-like conversations across voice and text channels.",
    category: "applications",
  },
  
  // Business
  {
    term: "AI Readiness",
    definition: "An organization's preparedness to adopt and benefit from AI technologies based on data, infrastructure, and culture.",
    category: "business",
  },
  {
    term: "AI Maturity",
    definition: "The level of AI adoption and sophistication within an organization, from exploration to enterprise-wide deployment.",
    category: "business",
  },
  {
    term: "ROI",
    definition: "Return on Investment - The measurable business value gained from AI implementation relative to its cost.",
    category: "business",
    aliases: ["Return on Investment"],
  },
  {
    term: "Proof of Concept",
    definition: "A small-scale AI project to validate feasibility and potential value before full implementation.",
    category: "business",
    aliases: ["POC", "PoC"],
  },
  {
    term: "MLOps",
    definition: "Practices for deploying, monitoring, and maintaining machine learning models in production environments.",
    category: "business",
  },
  {
    term: "AI Ethics",
    definition: "Principles and guidelines ensuring AI systems are developed and used responsibly, fairly, and transparently.",
    category: "business",
  },
  {
    term: "Data Pipeline",
    definition: "The automated flow of data from sources through processing to storage, essential for AI systems.",
    category: "business",
  },
];

// Build a lookup map for quick term matching
export const GLOSSARY_MAP: Map<string, GlossaryTerm> = new Map();

AI_GLOSSARY.forEach((item) => {
  // Add main term (case-insensitive key)
  GLOSSARY_MAP.set(item.term.toLowerCase(), item);
  
  // Add aliases
  if (item.aliases) {
    item.aliases.forEach((alias) => {
      GLOSSARY_MAP.set(alias.toLowerCase(), item);
    });
  }
});

// Get all searchable terms for highlighting
export function getAllTermPatterns(): string[] {
  const patterns: string[] = [];
  
  AI_GLOSSARY.forEach((item) => {
    patterns.push(item.term);
    if (item.aliases) {
      patterns.push(...item.aliases);
    }
  });
  
  // Sort by length descending to match longer terms first
  return patterns.sort((a, b) => b.length - a.length);
}

// Find a term definition
export function findTerm(text: string): GlossaryTerm | undefined {
  return GLOSSARY_MAP.get(text.toLowerCase());
}
