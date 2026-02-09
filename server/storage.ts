import { 
  type User, type InsertUser, type Lead, type InsertLead,
  type BlogArticle, type InsertBlogArticle,
  type DeletedContentSlug,
  users, leads, blogArticles, deletedContentSlugs
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createLead(lead: InsertLead): Promise<Lead>;
  getLeads(): Promise<Lead[]>;
  getLeadById(id: string): Promise<Lead | undefined>;
  getBlogArticles(): Promise<BlogArticle[]>;
  getBlogArticleBySlug(slug: string): Promise<BlogArticle | undefined>;
  createBlogArticle(article: InsertBlogArticle): Promise<BlogArticle>;
  deleteBlogArticle(id: string): Promise<void>;
  getDeletedContentSlugs(): Promise<DeletedContentSlug[]>;
  addDeletedContentSlug(slug: string): Promise<DeletedContentSlug>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async createLead(insertLead: InsertLead): Promise<Lead> {
    const [lead] = await db.insert(leads).values(insertLead).returning();
    return lead;
  }

  async getLeads(): Promise<Lead[]> {
    return await db.select().from(leads).orderBy(desc(leads.createdAt));
  }

  async getLeadById(id: string): Promise<Lead | undefined> {
    const [lead] = await db.select().from(leads).where(eq(leads.id, id));
    return lead || undefined;
  }

  async getBlogArticles(): Promise<BlogArticle[]> {
    return await db.select().from(blogArticles).orderBy(blogArticles.createdAt);
  }

  async getBlogArticleBySlug(slug: string): Promise<BlogArticle | undefined> {
    const [article] = await db.select().from(blogArticles).where(eq(blogArticles.slug, slug));
    return article || undefined;
  }

  async createBlogArticle(insertArticle: InsertBlogArticle): Promise<BlogArticle> {
    const [article] = await db.insert(blogArticles).values(insertArticle).returning();
    return article;
  }

  async deleteBlogArticle(id: string): Promise<void> {
    await db.delete(blogArticles).where(eq(blogArticles.id, id));
  }

  async getDeletedContentSlugs(): Promise<DeletedContentSlug[]> {
    return await db.select().from(deletedContentSlugs).orderBy(desc(deletedContentSlugs.deletedAt));
  }

  async addDeletedContentSlug(slug: string): Promise<DeletedContentSlug> {
    const [result] = await db.insert(deletedContentSlugs).values({ slug }).returning();
    return result;
  }
}

export const storage = new DatabaseStorage();
