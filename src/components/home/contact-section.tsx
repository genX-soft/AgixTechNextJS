'use client'
import { useState, useRef } from "react";
import { useInView, motion } from "@/lib/motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { useCelebration } from "@/components/success-celebration";
import { insertLeadSchema, type InsertLead } from "@shared/lead-validation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CheckCircle2, Phone, Mail } from "lucide-react";

export function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const { toast } = useToast();
  const { triggerCelebration } = useCelebration();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<InsertLead>({
    resolver: zodResolver(insertLeadSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      role: "",
      message: "",
    },
  });

  const onSubmit = async (data: InsertLead) => {
    setIsSubmitting(true);
    try {
      const { submitLead } = await import("@/lib/lead-submission");
      const result = await submitLead(
        {
          name: data.name,
          email: data.email,
          company: data.company || undefined,
          role: data.role || undefined,
          message: data.message || undefined,
        },
        {
          formType: "contact_form",
          source: "homepage_contact",
        }
      );

      if (result.success) {
        triggerCelebration();
        toast({
          title: "Message sent",
          description: "We'll be in touch within 24 hours.",
        });
        form.reset();
      } else {
        toast({
          title: "Something went wrong",
          description: result.error || "Please try again or email us directly.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again or email us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-background" ref={ref}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4">Get Started</Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4" data-testid="heading-contact">
            Ready to Transform Your Business?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Let&apos;s discuss how AI can help you achieve your goals. No pressure, just clarity.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Why Talk to Us?</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <p className="text-muted-foreground">
                    <span className="text-foreground font-medium">Free consultation</span> — Understand your options before committing
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <p className="text-muted-foreground">
                    <span className="text-foreground font-medium">Honest assessment</span> — We&apos;ll tell you if AI is right for your situation
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <p className="text-muted-foreground">
                    <span className="text-foreground font-medium">Clear next steps</span> — Walk away with actionable recommendations
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Contact Us Directly</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <a
                    href="tel:+18574141353"
                    className="text-muted-foreground hover:text-foreground text-xms transition-colors"
                    data-testid="link-phone"
                  >
                    +1 857 4141 353
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <a
                    href="mailto:santosh@agixtech.com"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    data-testid="link-email"
                  >
                    santosh@agixtech.com
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-border/50">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-6">Send Us a Message</h3>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" {...field} data-testid="input-name" autoComplete="name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="you@company.com" {...field} data-testid="input-email" autoComplete="email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company</FormLabel>
                            <FormControl>
                              <Input placeholder="Your company" {...field} data-testid="input-company" autoComplete="organization" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Role</FormLabel>
                            <FormControl>
                              <Input placeholder="Your role" {...field} data-testid="input-role" autoComplete="organization-title" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>How can we help?</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about your situation or goals..."
                              className="min-h-[100px]"
                              {...field}
                              data-testid="textarea-message"
                              autoComplete="off"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                      data-testid="button-submit"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
