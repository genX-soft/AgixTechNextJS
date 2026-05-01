'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCelebration } from "@/components/success-celebration";
import { submitLead } from "@/lib/lead-submission";

export interface ChallengeOption {
  value: string;
  label: string;
}

export interface IndustryLeadFormProps {
  headline?: string;
  subheadline?: string;
  challengeOptions: ChallengeOption[];
  ctaLabel?: string;
  challengeLabel?: string;
  challengePlaceholder?: string;
  namePlaceholder?: string;
  orgPlaceholder?: string;
  disclaimer?: string;
  successTitle?: string;
  successMessage?: string;
  industry: string;
  formType: string;
  source: string;
  ctaId: string;
  ctaText?: string;
  ctaLocation: string;
  testIdPrefix?: string;
}

export function IndustryLeadForm({
  challengeOptions,
  ctaLabel = "Get a Custom AI Strategy",
  challengeLabel = "What are you looking to solve?",
  challengePlaceholder = "Select a use case",
  namePlaceholder = "Your Name",
  orgPlaceholder = "Your Organization",
  disclaimer,
  successTitle = "Request Received",
  successMessage = "Our team will reach out within one business day.",
  industry,
  formType,
  source,
  ctaId,
  ctaText,
  ctaLocation,
  testIdPrefix = "industry",
}: IndustryLeadFormProps) {
  const { toast } = useToast();
  const { triggerCelebration } = useCelebration();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", organization: "", challenge: "" });
  const [submitted, setSubmitted] = useState(false);

  const resolvedCtaText = ctaText ?? ctaLabel;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const result = await submitLead(
      {
        name: formData.name,
        email: formData.email,
        company: formData.organization,
        industry,
        challenges: formData.challenge ? [formData.challenge] : [],
      },
      {
        formType,
        source,
        ctaId,
        ctaText: resolvedCtaText,
        ctaLocation,
      }
    );
    setIsSubmitting(false);
    if (result.success) {
      triggerCelebration();
      setSubmitted(true);
      toast({ title: "You're in!", description: successMessage });
    } else {
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12" data-testid={`${testIdPrefix}-form-success`}>
        <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-green-500" />
        </div>
        <h3 className="text-xl font-bold mb-2">{successTitle}</h3>
        <p className="text-muted-foreground">{successMessage}</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor={`${testIdPrefix}-name`}>Your Name</Label>
            <Input
              id={`${testIdPrefix}-name`}
              name="name"
              autoComplete="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder={namePlaceholder}
              data-testid={`input-${testIdPrefix}-name`}
            />
          </div>
          <div>
            <Label htmlFor={`${testIdPrefix}-email`}>Work Email *</Label>
            <Input
              id={`${testIdPrefix}-email`}
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="you@organization.com"
              data-testid={`input-${testIdPrefix}-email`}
            />
          </div>
          <div>
            <Label htmlFor={`${testIdPrefix}-org`}>Organization Name</Label>
            <Input
              id={`${testIdPrefix}-org`}
              name="organization"
              autoComplete="organization"
              value={formData.organization}
              onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
              placeholder={orgPlaceholder}
              data-testid={`input-${testIdPrefix}-org`}
            />
          </div>
          <div>
            <Label htmlFor={`${testIdPrefix}-challenge`}>{challengeLabel}</Label>
            <Select
              value={formData.challenge}
              onValueChange={(v) => setFormData({ ...formData, challenge: v })}
            >
              <SelectTrigger id={`${testIdPrefix}-challenge`} data-testid={`select-${testIdPrefix}-challenge`}>
                <SelectValue placeholder={challengePlaceholder} />
              </SelectTrigger>
              <SelectContent>
                {challengeOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
          data-testid={`button-${testIdPrefix}-submit`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              {ctaLabel} <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
        {disclaimer && (
          <p className="text-xs text-center text-muted-foreground">{disclaimer}</p>
        )}
      </form>
    </div>
  );
}
