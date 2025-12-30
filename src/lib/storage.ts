import { type User, type InsertUser, type Lead, type InsertLead, users, leads } from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createLead(lead: InsertLead): Promise<Lead>;
  getLeads(): Promise<Lead[]>;
  getLeadById(id: string): Promise<Lead | undefined>;
  updateLead(id: string, data: Partial<InsertLead>): Promise<Lead | undefined>;
  deleteLead(id: string): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async createLead(insertLead: InsertLead): Promise<Lead> {
    const [lead] = await db.insert(leads).values({
      name: insertLead.name,
      email: insertLead.email,
      phone: insertLead.phone ?? null,
      company: insertLead.company ?? null,
      role: insertLead.role ?? null,
      message: insertLead.message ?? null,
      source: insertLead.source ?? null,
      pagePath: insertLead.pagePath ?? null,
      formType: insertLead.formType ?? null,
      industry: insertLead.industry ?? null,
      companySize: insertLead.companySize ?? null,
      challenges: insertLead.challenges ?? null,
      urgency: insertLead.urgency ?? null,
      aiReadinessTag: insertLead.aiReadinessTag ?? null,
      leadScore: insertLead.leadScore ?? null,
      behaviorData: insertLead.behaviorData ?? null,
      journey: insertLead.journey ?? null,
      metadata: insertLead.metadata ?? null,
    }).returning();
    return lead;
  }

  async getLeads(): Promise<Lead[]> {
    return await db.select().from(leads).orderBy(desc(leads.createdAt));
  }

  async getLeadById(id: string): Promise<Lead | undefined> {
    const [lead] = await db.select().from(leads).where(eq(leads.id, id));
    return lead;
  }

  async updateLead(id: string, data: Partial<InsertLead>): Promise<Lead | undefined> {
    const [lead] = await db.update(leads).set(data).where(eq(leads.id, id)).returning();
    return lead;
  }

  async deleteLead(id: string): Promise<boolean> {
    const result = await db.delete(leads).where(eq(leads.id, id)).returning();
    return result.length > 0;
  }
}

export const storage = new DatabaseStorage();
