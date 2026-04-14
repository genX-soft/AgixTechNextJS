import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface InsightsLink {
  label: string;
  href: string;
}

interface ServiceInsightsTeaserProps {
  links?: InsightsLink[];
}

const DEFAULT_LINKS: InsightsLink[] = [
  { label: "Explore All AI Insights", href: "/insights/" },
];

export function ServiceInsightsTeaser({ links = DEFAULT_LINKS }: ServiceInsightsTeaserProps) {
  return (
    <section className="py-12 bg-muted/30 border-t border-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Card className="bg-background border-border">
          <CardContent className="py-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 shrink-0">
                <BookOpen className="w-5 h-5 text-primary" aria-hidden="true" />
              </div>
              <div className="flex-1">
                <p className="font-semibold mb-1">Deepen Your Understanding</p>
                <p className="text-sm text-muted-foreground">
                  Practical guides, architecture breakdowns, and real-world case studies from
                  the AGIX Technologies team.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 shrink-0">
                {links.map((link) => (
                  <Button key={link.href} variant="outline" size="sm" asChild>
                    <Link href={link.href} data-testid={`link-insights-teaser-${link.href.replace(/\//g, "-")}`}>
                      {link.label}
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
