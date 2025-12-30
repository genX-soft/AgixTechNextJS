'use client'

import { useState } from "react";
import { motion } from "framer-motion";
import { MainHeader } from "@/components/main-header";
import { MainFooter } from "@/components/main-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowRight,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Building2,
  CheckCircle2,
  MessageSquare,
  Sparkles,
  Globe,
  Send,
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { submitLead } from "@/lib/lead-submission";
import { useCelebration } from "@/components/success-celebration";

const roleOptions = [
  { value: "founder-ceo", label: "Founder / CEO" },
  { value: "cto-engineering", label: "CTO / Engineering Lead" },
  { value: "product-manager", label: "Product Manager" },
  { value: "operations-business", label: "Operations / Business Head" },
  { value: "consultant", label: "Consultant" },
  { value: "other", label: "Other" },
];

const helpOptions = [
  { value: "exploring", label: "Exploring AI possibilities" },
  { value: "automation", label: "AI Automation / Workflow Optimization" },
  { value: "voice-agents", label: "AI Voice Agents / Conversational AI" },
  { value: "agentic", label: "Agentic AI Systems" },
  { value: "rag", label: "RAG / Knowledge AI" },
  { value: "predictive", label: "Predictive & Decision Intelligence" },
  { value: "computer-vision", label: "Computer Vision Solutions" },
  { value: "custom-product", label: "Custom AI Product Development" },
  { value: "support", label: "Ongoing AI Support & Optimization" },
  { value: "partnership", label: "Partnership / Collaboration" },
  { value: "media", label: "Media / Press" },
  { value: "career", label: "Career / Internship" },
  { value: "other", label: "Other" },
];

const industryOptions = [
  { value: "healthcare", label: "Healthcare" },
  { value: "fintech", label: "Fintech / BFSI" },
  { value: "real-estate", label: "Real Estate" },
  { value: "retail", label: "Retail / E-commerce" },
  { value: "education", label: "Education / EdTech" },
  { value: "logistics", label: "Logistics / Supply Chain" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "saas", label: "SaaS / Technology" },
  { value: "government", label: "Government / Public Sector" },
  { value: "other", label: "Other" },
];

const projectStageOptions = [
  { value: "exploring", label: "Just exploring ideas" },
  { value: "validating", label: "Validating feasibility" },
  { value: "ready", label: "Ready to build" },
  { value: "improving", label: "Improving an existing AI system" },
  { value: "scaling", label: "Scaling AI across teams" },
  { value: "urgent", label: "Urgent operational issue" },
];

const budgetOptions = [
  { value: "under-10k", label: "Under $10,000" },
  { value: "10k-20k", label: "$10,000 - $20,000" },
  { value: "20k-30k", label: "$20,000 - $30,000" },
  { value: "30k-50k", label: "$30,000 - $50,000" },
  { value: "50k-plus", label: "$50,000+" },
  { value: "not-decided", label: "Not decided yet" },
];

const offices = [
  {
    country: "United States",
    address: "99 Derby Street, Hingham, MA, 02043",
    flag: "US",
  },
  {
    country: "United Kingdom",
    address: "61 Bridge Street, Kington, HR5 3DJ",
    flag: "UK",
  },
  {
    country: "India",
    address: "2nd Floor, R 10/63, Chitrakoot Scheme, Vaishali Nagar, Jaipur, Rajasthan 302021",
    flag: "IN",
  },
];

function scrollToForm() {
  const element = document.getElementById("contact-form");
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export default function ContactPage() {
  const { triggerCelebration } = useCelebration();
  const [formData, setFormData] = useState({
    fullName: "",
    workEmail: "",
    companyName: "",
    role: "",
    helpWith: "",
    industry: "",
    projectStage: "",
    budget: "",
    message: "",
    scheduleCall: false,
    feasibilityCheck: false,
    confidential: false,
    partnership: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    trackEvent("lead_form_submit", {
      event_category: "contact",
      event_label: "contact_form_submission",
    });

    const challenges: string[] = [];
    if (formData.helpWith) challenges.push(formData.helpWith);

    const result = await submitLead(
      {
        name: formData.fullName,
        email: formData.workEmail,
        company: formData.companyName,
        role: formData.role,
        message: formData.message,
        industry: formData.industry,
        urgency: formData.projectStage,
        challenges,
      },
      {
        formType: "contact-page",
        source: "contact-page",
        ctaId: "contact-form-submit",
        ctaText: "Send Message",
        ctaLocation: "/corporate/contact",
        additionalMetadata: {
          budget: formData.budget,
          scheduleCall: formData.scheduleCall,
          feasibilityCheck: formData.feasibilityCheck,
          confidential: formData.confidential,
          partnership: formData.partnership,
        },
      }
    );

    setIsSubmitting(false);
    
    if (result.success) {
      triggerCelebration();
      setIsSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <MainHeader />

      <section className="relative min-h-[80vh] flex items-center pt-24 lg:pt-28 pb-16 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight" data-testid="heading-contact-hero">
                Have an AI Challenge or Idea?
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              Tell us what's on your mind - we'll help you turn it into a clear, workable path.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/25"
                onClick={scrollToForm}
                data-testid="button-hero-send-enquiry"
              >
                <Mail className="w-5 h-5 mr-2" />
                Send an Enquiry
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                data-testid="button-hero-schedule-call"
              >
                <a href="https://calendly.com/agix" target="_blank" rel="noopener noreferrer">
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule a Call
                </a>
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-sm text-muted-foreground"
            >
              No pressure. No generic pitches. Just a focused conversation.
            </motion.p>
          </div>
        </div>
      </section>

      <section id="contact-form" className="py-16 lg:py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4" data-testid="heading-contact-form">
              Tell Us About Your Requirement
            </h2>
            <p className="text-muted-foreground">
              A single smart form designed to understand your intent clearly.
            </p>
          </div>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Card className="border-primary/20">
                <CardContent className="pt-12 pb-12 text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">Thank You for Reaching Out</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      We've received your enquiry and will get back to you within 24 business hours.
                    </p>
                  </div>
                  <Button asChild>
                    <a href="/">Return to Homepage</a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  Your Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        required
                        value={formData.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        placeholder="Your full name"
                        data-testid="input-full-name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="workEmail">Work Email *</Label>
                      <Input
                        id="workEmail"
                        type="email"
                        required
                        value={formData.workEmail}
                        onChange={(e) => handleInputChange("workEmail", e.target.value)}
                        placeholder="you@company.com"
                        data-testid="input-work-email"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input
                        id="companyName"
                        value={formData.companyName}
                        onChange={(e) => handleInputChange("companyName", e.target.value)}
                        placeholder="Your company"
                        data-testid="input-company-name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Your Role</Label>
                      <Select
                        value={formData.role}
                        onValueChange={(value) => handleInputChange("role", value)}
                      >
                        <SelectTrigger id="role" data-testid="select-role">
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          {roleOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="helpWith">What Would You Like Help With? *</Label>
                    <Select
                      value={formData.helpWith}
                      onValueChange={(value) => handleInputChange("helpWith", value)}
                    >
                      <SelectTrigger id="helpWith" data-testid="select-help-with">
                        <SelectValue placeholder="Select a topic" />
                      </SelectTrigger>
                      <SelectContent>
                        {helpOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="industry">Industry (Optional)</Label>
                      <Select
                        value={formData.industry}
                        onValueChange={(value) => handleInputChange("industry", value)}
                      >
                        <SelectTrigger id="industry" data-testid="select-industry">
                          <SelectValue placeholder="Select your industry" />
                        </SelectTrigger>
                        <SelectContent>
                          {industryOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="projectStage">Project Stage</Label>
                      <Select
                        value={formData.projectStage}
                        onValueChange={(value) => handleInputChange("projectStage", value)}
                      >
                        <SelectTrigger id="projectStage" data-testid="select-project-stage">
                          <SelectValue placeholder="Where are you in the journey?" />
                        </SelectTrigger>
                        <SelectContent>
                          {projectStageOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="budget">Estimated Project Budget (Optional)</Label>
                    <p className="text-xs text-muted-foreground">Helps us suggest the right approach.</p>
                    <Select
                      value={formData.budget}
                      onValueChange={(value) => handleInputChange("budget", value)}
                    >
                      <SelectTrigger id="budget" data-testid="select-budget">
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        {budgetOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Your Message *</Label>
                    <p className="text-xs text-muted-foreground">
                      Share as much or as little as you want - business context, technical details, existing tools, or pain points.
                    </p>
                    <Textarea
                      id="message"
                      required
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Tell us about your challenge, idea, or goal..."
                      className="min-h-[150px]"
                      data-testid="textarea-message"
                    />
                  </div>

                  <div className="space-y-4">
                    <Label>Additional Preferences (Optional)</Label>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="scheduleCall"
                          checked={formData.scheduleCall}
                          onCheckedChange={(checked) => handleInputChange("scheduleCall", checked as boolean)}
                          data-testid="checkbox-schedule-call"
                        />
                        <label htmlFor="scheduleCall" className="text-sm cursor-pointer">
                          I'd like to schedule a call
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="feasibilityCheck"
                          checked={formData.feasibilityCheck}
                          onCheckedChange={(checked) => handleInputChange("feasibilityCheck", checked as boolean)}
                          data-testid="checkbox-feasibility"
                        />
                        <label htmlFor="feasibilityCheck" className="text-sm cursor-pointer">
                          I need a quick feasibility check
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="confidential"
                          checked={formData.confidential}
                          onCheckedChange={(checked) => handleInputChange("confidential", checked as boolean)}
                          data-testid="checkbox-confidential"
                        />
                        <label htmlFor="confidential" className="text-sm cursor-pointer">
                          This requires a confidential discussion
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="partnership"
                          checked={formData.partnership}
                          onCheckedChange={(checked) => handleInputChange("partnership", checked as boolean)}
                          data-testid="checkbox-partnership"
                        />
                        <label htmlFor="partnership" className="text-sm cursor-pointer">
                          I'm exploring a long-term partnership
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/25"
                      disabled={isSubmitting}
                      data-testid="button-submit-enquiry"
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Send My Enquiry
                        </>
                      )}
                    </Button>
                    <p className="text-sm text-muted-foreground text-center mt-4">
                      We typically respond within 24 business hours.
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4" data-testid="heading-talk-directly">
                  Prefer a Conversation Instead of a Form?
                </h2>
                <p className="text-muted-foreground">
                  Some discussions are easier to have live. Use this option if you want:
                </p>
              </div>

              <ul className="space-y-3">
                {[
                  "Strategic clarity",
                  "Architecture or feasibility guidance",
                  "Workflow or AI system review",
                  "Enterprise-level consultation",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Button
                size="lg"
                asChild
                data-testid="button-schedule-call-section"
              >
                <a href="https://calendly.com/agix" target="_blank" rel="noopener noreferrer">
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule a Call
                </a>
              </Button>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                Our Global Offices
              </h3>
              <p className="text-muted-foreground">Where we work from:</p>

              <div className="grid gap-4">
                {offices.map((office) => (
                  <Card key={office.country} className="border-primary/10">
                    <CardContent className="p-4 flex items-start gap-4">
                      <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{office.country}</h4>
                        <p className="text-sm text-muted-foreground">{office.address}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-4">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary" />
                    Quick Contact
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">Have a question right now?</p>
                  <a
                    href="tel:+18573656167"
                    className="text-lg font-semibold text-primary hover:underline"
                    data-testid="link-phone-number"
                  >
                    +1 857 365 6167
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Sparkles className="w-12 h-12 text-primary mx-auto" />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white" data-testid="heading-closing-cta">
              Serious About AI? Let's Get It Right From Day One
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Whether you're solving one problem or building an intelligent system, the first step is a clear conversation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/25"
                onClick={scrollToForm}
                data-testid="button-closing-send-enquiry"
              >
                <Mail className="w-5 h-5 mr-2" />
                Send an Enquiry
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
                asChild
                data-testid="button-closing-schedule-call"
              >
                <a href="https://calendly.com/agix" target="_blank" rel="noopener noreferrer">
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule a Call
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <MainFooter />
    </div>
  );
}
