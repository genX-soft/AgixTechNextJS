'use client'

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, CheckCircle2, Sparkles, Loader2 } from "lucide-react";
import { submitLead } from "@/lib/lead-submission";
import { useCelebration } from "@/components/success-celebration";
import { INDUSTRIES, COMPANY_SIZES, CHALLENGES, URGENCY_LEVELS } from "@shared/schema";

const ctaFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid work email"),
  company: z.string().min(2, "Company name is required"),
  role: z.string().min(2, "Your role is required"),
  industry: z.string().min(1, "Please select your industry"),
  companySize: z.string().min(1, "Please select company size"),
  challenges: z.array(z.string()).min(1, "Please select at least one challenge"),
  urgency: z.string().min(1, "Please select your timeline"),
  message: z.string().optional(),
});

type CtaFormData = z.infer<typeof ctaFormSchema>;

interface CtaFormProps {
  headline?: string;
  subheadline?: string;
  badgeText?: string;
  submitLabel?: string;
  contextNote?: string;
}

export function CtaForm({
  headline = "Ready to Build Your AI System?",
  subheadline = "Talk to our AI systems architects about your specific challenges. Get a personalized roadmap for implementation.",
  badgeText = "Free Consultation",
  submitLabel = "Request Consultation",
  contextNote,
}: CtaFormProps) {
  const { toast } = useToast();
  const { triggerCelebration } = useCelebration();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CtaFormData>({
    resolver: zodResolver(ctaFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      role: "",
      industry: "",
      companySize: "",
      challenges: [],
      urgency: "",
      message: "",
    },
  });

  const onSubmit = async (data: CtaFormData) => {
    setIsSubmitting(true);
    try {
      const result = await submitLead(
        {
          name: data.name,
          email: data.email,
          company: data.company,
          role: data.role,
          message: data.message,
          industry: data.industry,
          companySize: data.companySize,
          challenges: data.challenges,
          urgency: data.urgency,
        },
        {
          formType: "cta_consultation",
          source: "cta_form",
          ctaId: "main-cta-form",
          ctaText: submitLabel,
          ctaLocation: "cta_section",
        }
      );

      if (result.success) {
        triggerCelebration();
        setIsSubmitted(true);
        toast({
          title: "Request Submitted",
          description: "Our team will reach out within 24 hours.",
        });
      } else {
        toast({
          title: "Error",
          description: result.error || "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="py-16"
      >
        <Card className="max-w-2xl mx-auto border-green-500/30 bg-green-500/5">
          <CardContent className="p-8 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold">Thank You!</h3>
            <p className="text-muted-foreground">
              Your consultation request has been received. One of our AI systems architects
              will reach out within 24 hours to discuss your project.
            </p>
            <p className="text-sm text-muted-foreground">
              Check your email for a confirmation with next steps.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <section className="py-20 lg:py-24 bg-gradient-to-br from-primary/10 via-background to-cyan-500/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-6"
          >
            <Badge variant="outline" className="border-primary/30 text-primary">
              <Sparkles className="w-3 h-3 mr-1" />
              {badgeText}
            </Badge>

            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              {headline}
            </h2>

            <p className="text-lg text-muted-foreground">
              {subheadline}
            </p>

            {contextNote && (
              <p className="text-sm text-muted-foreground italic border-l-2 border-primary/30 pl-4">
                {contextNote}
              </p>
            )}

            <div className="space-y-4 pt-4">
              {[
                "30-minute discovery call with an AI architect",
                "Custom roadmap for your use case",
                "ROI projection and timeline estimate",
                "No obligation — just insights",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <Card className="border-border/50 shadow-lg">
              <CardContent className="p-6 md:p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="text-left">
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Smith" className="h-12 sm:h-10" {...field} data-testid="input-cta-name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem className="text-left">
                            <FormLabel>Work Email</FormLabel>
                            <FormControl>
                              <Input placeholder="john@company.com" type="email" className="h-12 sm:h-10" {...field} data-testid="input-cta-email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem className="text-left">
                            <FormLabel>Company</FormLabel>
                            <FormControl>
                              <Input placeholder="Acme Inc." className="h-12 sm:h-10" {...field} data-testid="input-cta-company" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                          <FormItem className="text-left">
                            <FormLabel>Your Role</FormLabel>
                            <FormControl>
                              <Input placeholder="VP of Engineering" className="h-12 sm:h-10" {...field} data-testid="input-cta-role" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="industry"
                        render={({ field }) => (
                          <FormItem className="text-left">
                            <FormLabel>Industry</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-cta-industry">
                                  <SelectValue placeholder="Select industry" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {INDUSTRIES.map((industry) => (
                                  <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="companySize"
                        render={({ field }) => (
                          <FormItem className="text-left">
                            <FormLabel>Company Size</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-cta-company-size">
                                  <SelectValue placeholder="Select size" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {COMPANY_SIZES.map((size) => (
                                  <SelectItem key={size} value={size}>{size}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="challenges"
                      render={() => (
                        <FormItem className="text-left">
                          <FormLabel>What challenges are you facing? (Select all that apply)</FormLabel>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                            {CHALLENGES.map((challenge) => (
                              <FormField
                                key={challenge}
                                control={form.control}
                                name="challenges"
                                render={({ field }) => (
                                  <FormItem className="flex items-start space-x-2 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(challenge)}
                                        onCheckedChange={(checked) => {
                                          const current = field.value || [];
                                          if (checked) {
                                            field.onChange([...current, challenge]);
                                          } else {
                                            field.onChange(current.filter((v) => v !== challenge));
                                          }
                                        }}
                                        data-testid={`checkbox-challenge-${challenge.toLowerCase().replace(/\s+/g, '-')}`}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal cursor-pointer">{challenge}</FormLabel>
                                  </FormItem>
                                )}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="urgency"
                      render={({ field }) => (
                        <FormItem className="text-left">
                          <FormLabel>Project Timeline</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-cta-urgency">
                                <SelectValue placeholder="When do you want to start?" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {URGENCY_LEVELS.map((level) => (
                                <SelectItem key={level} value={level}>{level}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem className="text-left">
                          <FormLabel>Additional details (optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Any specific requirements or questions?"
                              className="min-h-[80px] resize-none"
                              {...field}
                              data-testid="textarea-cta-message"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full h-14 sm:h-12 text-base"
                      disabled={isSubmitting}
                      data-testid="button-cta-submit"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          {submitLabel}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      By submitting, you agree to our privacy policy. We'll never share your information.
                    </p>
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
