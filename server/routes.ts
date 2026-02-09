import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema, insertBlogArticleSchema } from "@shared/schema";
import { fromError } from "zod-validation-error";

const PASSCODE = '9636962228';

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post("/api/leads", async (req, res) => {
    try {
      const result = insertLeadSchema.safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromError(result.error);
        return res.status(400).json({ 
          error: validationError.toString() 
        });
      }
      
      const ipAddress = req.headers['x-forwarded-for'] as string || req.socket.remoteAddress || 'unknown';
      const realIp = Array.isArray(ipAddress) ? ipAddress[0] : ipAddress.split(',')[0].trim();
      
      const leadData = {
        ...result.data,
        metadata: {
          ...(result.data.metadata as Record<string, unknown> || {}),
          ipAddress: realIp,
        }
      };
      
      const lead = await storage.createLead(leadData);
      return res.status(201).json(lead);
    } catch (error) {
      console.error("Error creating lead:", error);
      return res.status(500).json({ 
        error: "Failed to submit request" 
      });
    }
  });

  app.get("/api/leads", async (req, res) => {
    const passcode = req.headers['x-passcode'];
    if (passcode !== PASSCODE) {
      return res.status(401).json({ error: "Invalid passcode" });
    }
    
    try {
      const leads = await storage.getLeads();
      return res.json(leads);
    } catch (error) {
      console.error("Error fetching leads:", error);
      return res.status(500).json({ 
        error: "Failed to fetch leads" 
      });
    }
  });

  app.get("/api/leads/:id", async (req, res) => {
    const passcode = req.headers['x-passcode'];
    if (passcode !== PASSCODE) {
      return res.status(401).json({ error: "Invalid passcode" });
    }
    
    try {
      const lead = await storage.getLeadById(req.params.id);
      if (!lead) {
        return res.status(404).json({ error: "Lead not found" });
      }
      return res.json(lead);
    } catch (error) {
      console.error("Error fetching lead:", error);
      return res.status(500).json({ error: "Failed to fetch lead" });
    }
  });

  // Blog Articles API - with passcode protection
  app.get("/api/blog-articles", async (req, res) => {
    const passcode = req.headers['x-passcode'];
    if (passcode !== PASSCODE) {
      return res.status(401).json({ error: "Invalid passcode" });
    }
    
    try {
      const articles = await storage.getBlogArticles();
      return res.json(articles);
    } catch (error) {
      console.error("Error fetching blog articles:", error);
      return res.status(500).json({ error: "Failed to fetch articles" });
    }
  });

  app.get("/api/blog-articles/:slug", async (req, res) => {
    const passcode = req.headers['x-passcode'];
    if (passcode !== PASSCODE) {
      return res.status(401).json({ error: "Invalid passcode" });
    }
    
    try {
      const article = await storage.getBlogArticleBySlug(req.params.slug);
      if (!article) {
        return res.status(404).json({ error: "Article not found" });
      }
      return res.json(article);
    } catch (error) {
      console.error("Error fetching blog article:", error);
      return res.status(500).json({ error: "Failed to fetch article" });
    }
  });

  app.post("/api/blog-articles", async (req, res) => {
    const passcode = req.headers['x-passcode'];
    if (passcode !== PASSCODE) {
      return res.status(401).json({ error: "Invalid passcode" });
    }
    
    try {
      const result = insertBlogArticleSchema.safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromError(result.error);
        return res.status(400).json({ error: validationError.toString() });
      }
      
      // Validate word count is at least 3500
      if (result.data.wordCount < 3500) {
        return res.status(400).json({ error: "Article must have at least 3500 words" });
      }
      
      const article = await storage.createBlogArticle(result.data);
      return res.status(201).json(article);
    } catch (error) {
      console.error("Error creating blog article:", error);
      return res.status(500).json({ error: "Failed to create article" });
    }
  });

  app.delete("/api/blog-articles/:id", async (req, res) => {
    const passcode = req.headers['x-passcode'];
    if (passcode !== PASSCODE) {
      return res.status(401).json({ error: "Invalid passcode" });
    }
    
    try {
      await storage.deleteBlogArticle(req.params.id);
      return res.status(204).send();
    } catch (error) {
      console.error("Error deleting blog article:", error);
      return res.status(500).json({ error: "Failed to delete article" });
    }
  });

  app.get("/api/content-engine/deleted-slugs", async (req, res) => {
    const passcode = req.headers['x-passcode'];
    if (passcode !== PASSCODE) {
      return res.status(401).json({ error: "Invalid passcode" });
    }
    
    try {
      const deleted = await storage.getDeletedContentSlugs();
      return res.json(deleted.map(d => d.slug));
    } catch (error) {
      console.error("Error fetching deleted slugs:", error);
      return res.status(500).json({ error: "Failed to fetch deleted articles" });
    }
  });

  app.post("/api/content-engine/delete-article", async (req, res) => {
    const passcode = req.headers['x-passcode'];
    if (passcode !== PASSCODE) {
      return res.status(401).json({ error: "Invalid passcode" });
    }
    
    try {
      const { slug } = req.body;
      if (!slug || typeof slug !== 'string') {
        return res.status(400).json({ error: "Valid slug is required" });
      }
      const result = await storage.addDeletedContentSlug(slug);
      return res.status(201).json(result);
    } catch (error) {
      console.error("Error deleting content article:", error);
      return res.status(500).json({ error: "Failed to delete article" });
    }
  });

  return httpServer;
}
