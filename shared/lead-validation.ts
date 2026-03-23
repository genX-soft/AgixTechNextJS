import { z } from "zod";

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

export type BehaviorData = z.infer<typeof behaviorDataSchema>;

export const insertLeadSchema = z.object({
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
