import { Lightbulb } from "lucide-react";

interface BlogQuickAnswerProps {
  title: string;
  answer: string;
}

export function BlogQuickAnswer({ title, answer }: BlogQuickAnswerProps) {
  if (!answer || answer.length < 30) return null;

  return (
    <div
      className="my-8 rounded-xl border border-primary/20 bg-primary/5 p-5"
      itemScope
      itemType="https://schema.org/Question"
    >
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">
          Quick Answer
        </span>
      </div>
      <p className="font-semibold text-sm text-foreground mb-2" itemProp="name">
        {title}
      </p>
      <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
        <p
          className="text-sm text-muted-foreground leading-relaxed"
          itemProp="text"
        >
          {answer}
        </p>
      </div>
    </div>
  );
}

export function extractQuickAnswer(
  title: string,
  excerpt: string,
  content: string
): string {
  const cleanExcerpt = excerpt
    .replace(/<[^>]*>/g, "")
    .replace(/&[^;]+;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (cleanExcerpt.length >= 80) {
    return cleanExcerpt.slice(0, 280).replace(/\s\S*$/, "") + (cleanExcerpt.length > 280 ? "…" : "");
  }

  const firstParaMatch = content.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
  if (firstParaMatch) {
    const firstPara = firstParaMatch[1]
      .replace(/<[^>]*>/g, "")
      .replace(/&[^;]+;/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    if (firstPara.length >= 40) {
      return firstPara.slice(0, 280).replace(/\s\S*$/, "") + (firstPara.length > 280 ? "…" : "");
    }
  }

  return cleanExcerpt;
}
