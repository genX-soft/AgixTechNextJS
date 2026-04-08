import { Star, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Testimonial } from '@/lib/data/testimonials';

interface TestimonialCardProps {
  testimonial: Testimonial;
  compact?: boolean;
}

const SOURCE_COLORS: Record<string, string> = {
  Clutch: 'bg-red-500/20 text-red-400 border-red-500/30',
  Sortlist: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  TechBehemoths: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  Google: 'bg-green-500/20 text-green-400 border-green-500/30',
};

const SERVICE_COLORS: Record<string, string> = {
  'AI Consulting': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  'AI Development': 'bg-primary/20 text-primary border-primary/30',
  'Automation': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  'Voice AI': 'bg-violet-500/20 text-violet-400 border-violet-500/30',
  'Industry Solutions': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
};

export default function TestimonialCard({ testimonial, compact = false }: TestimonialCardProps) {
  const {
    reviewerName,
    reviewerTitle,
    company,
    source,
    sourceUrl,
    rating,
    service,
    industry,
    excerpt,
    trustTag,
    date,
  } = testimonial;

  return (
    <Card
      className="h-full border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:bg-card/80 transition-all duration-300 group"
      data-testid={`card-testimonial-${testimonial.id}`}
    >
      <CardContent className={compact ? 'p-4 space-y-3' : 'p-6 space-y-4'}>
        {/* Rating row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/30'}`}
              />
            ))}
          </div>
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-xs px-2 py-0.5 rounded-full border flex items-center gap-1 hover:opacity-80 transition-opacity ${SOURCE_COLORS[source]}`}
            data-testid={`link-testimonial-source-${testimonial.id}`}
          >
            {source}
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>

        {/* Excerpt */}
        <blockquote className={`text-muted-foreground leading-relaxed ${compact ? 'text-sm line-clamp-3' : 'text-sm'}`}>
          &ldquo;{excerpt}&rdquo;
        </blockquote>

        {/* Trust tag */}
        {!compact && trustTag && (
          <div className="inline-flex items-center gap-1.5 bg-primary/10 border border-primary/20 rounded-full px-3 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-xs text-primary font-medium">{trustTag}</span>
          </div>
        )}

        {/* Reviewer info */}
        <div className="pt-2 border-t border-border/30">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-semibold text-sm text-foreground">{reviewerName}</p>
              <p className="text-xs text-muted-foreground">{reviewerTitle}, {company}</p>
              {!compact && (
                <p className="text-xs text-muted-foreground/60 mt-0.5">{industry} · {new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
              )}
            </div>
            <Badge
              variant="outline"
              className={`text-xs shrink-0 ${SERVICE_COLORS[service]}`}
            >
              {service}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
