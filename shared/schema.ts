import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, jsonb, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Keyword analytics schema for each keyword in a blog
export const keywordStatSchema = z.object({
  keyword: z.string(),
  longTailVariant: z.string(),
  monthlyVolume: z.number(),
  difficulty: z.number().min(0).max(100),
  occurrences: z.number().default(0),
});

export type KeywordStat = z.infer<typeof keywordStatSchema>;

// Blog article schema with rich metadata
export const blogArticles = pgTable("blog_articles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  shortIntro: text("short_intro").notNull(),
  painAreas: text("pain_areas").array().notNull(),
  targetAudience: text("target_audience").notNull(),
  category: text("category").notNull(),
  tags: text("tags").array().notNull(),
  keywords: jsonb("keywords").$type<KeywordStat[]>().notNull(),
  agixSolutions: text("agix_solutions").array().notNull(),
  metaDescription: text("meta_description").notNull(),
  heroImage: text("hero_image"),
  authorName: text("author_name").notNull(),
  authorRole: text("author_role").notNull(),
  content: text("content").notNull(),
  wordCount: integer("word_count").notNull(),
  readTime: text("read_time").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertBlogArticleSchema = createInsertSchema(blogArticles).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  title: z.string().min(10, "Title must be at least 10 characters"),
  shortIntro: z.string().min(50, "Short intro must be at least 50 characters"),
  painAreas: z.array(z.string()).min(1, "At least one pain area required"),
  targetAudience: z.string().min(5, "Target audience is required"),
  category: z.string().min(2, "Category is required"),
  tags: z.array(z.string()).min(1, "At least one tag required"),
  keywords: z.array(keywordStatSchema).min(1, "At least one keyword required"),
  agixSolutions: z.array(z.string()).min(1, "At least one AGIX solution required"),
  content: z.string().min(3500, "Content must be at least 3500 words"),
  wordCount: z.number().min(3500, "Word count must be at least 3500"),
});

export type InsertBlogArticle = z.infer<typeof insertBlogArticleSchema>;
export type BlogArticle = typeof blogArticles.$inferSelect;

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const journeyEntrySchema = z.object({
  path: z.string(),
  title: z.string().optional(),
  timestamp: z.number(),
});

export type JourneyEntry = z.infer<typeof journeyEntrySchema>;

export const behaviorDataSchema = z.object({
  scrollDepth: z.number().optional(),
  timeOnPage: z.number().optional(),
  exitIntent: z.boolean().optional(),
  interactionCount: z.number().optional(),
  ctaClicks: z.array(z.object({
    ctaId: z.string(),
    ctaText: z.string(),
    ctaLocation: z.string(),
    timestamp: z.number(),
  })).optional(),
});

export type BehaviorDataSchema = z.infer<typeof behaviorDataSchema>;

export const AI_READINESS_TAGS = [
  "Early Explorer",
  "Budget-Aware Evaluator", 
  "Ready for Pilot",
  "Enterprise / Multi-System",
] as const;

export type AIReadinessTag = typeof AI_READINESS_TAGS[number];

export const INDUSTRIES = [
  "Healthcare",
  "Finance & Banking",
  "Manufacturing",
  "Retail & E-commerce",
  "Technology",
  "Professional Services",
  "Education",
  "Government",
  "Real Estate",
  "Other",
] as const;

export const COMPANY_SIZES = [
  "1-10 employees",
  "11-50 employees",
  "51-200 employees",
  "201-1000 employees",
  "1000+ employees",
] as const;

export const CHALLENGES = [
  "Manual processes slowing operations",
  "Data silos across departments",
  "Customer response delays",
  "Decision-making bottlenecks",
  "Document processing overhead",
  "Knowledge management gaps",
  "Compliance and risk concerns",
  "Scaling operations efficiently",
  "Cost reduction pressure",
  "Other",
] as const;

export const URGENCY_LEVELS = [
  "Immediate (within 30 days)",
  "Near-term (1-3 months)",
  "Planning phase (3-6 months)",
  "Exploring options",
] as const;

export const leads = pgTable("leads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  company: text("company"),
  role: text("role"),
  message: text("message"),
  source: text("source"),
  pagePath: text("page_path"),
  formType: text("form_type"),
  industry: text("industry"),
  companySize: text("company_size"),
  challenges: text("challenges").array(),
  urgency: text("urgency"),
  aiReadinessTag: text("ai_readiness_tag"),
  leadScore: integer("lead_score"),
  behaviorData: jsonb("behavior_data").$type<BehaviorDataSchema>(),
  journey: jsonb("journey").$type<JourneyEntry[]>(),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
  createdAt: true,
}).extend({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().optional(),
  company: z.string().optional(),
  role: z.string().optional(),
  message: z.string().optional(),
  source: z.string().optional(),
  pagePath: z.string().optional(),
  formType: z.string().optional(),
  industry: z.string().optional(),
  companySize: z.string().optional(),
  challenges: z.array(z.string()).optional(),
  urgency: z.string().optional(),
  aiReadinessTag: z.string().optional(),
  leadScore: z.number().optional(),
  behaviorData: behaviorDataSchema.optional(),
  journey: z.array(journeyEntrySchema).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;

export const deletedContentSlugs = pgTable("deleted_content_slugs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull().unique(),
  deletedAt: timestamp("deleted_at").defaultNow(),
});

export type DeletedContentSlug = typeof deletedContentSlugs.$inferSelect;
