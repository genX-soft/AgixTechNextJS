import { MainHeader } from "@/components/main-header"
import { MainFooter } from "@/components/main-footer"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CaseStudyTemplateProps {
  children: React.ReactNode;
  prevCase?: { name: string; url: string };
  nextCase?: { name: string; url: string };
}

export function CaseStudyTemplate({ children, prevCase, nextCase }: CaseStudyTemplateProps) {
  return (
    <div className="min-h-screen bg-background">
      <MainHeader />
      {children}
      
      {/* Navigation */}
      {(prevCase || nextCase) && (
        <section className="py-8 border-t border-border/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 flex justify-between">
            {prevCase ? (
              <Link href={prevCase.url}>
                <Button variant="ghost" size="sm" className="gap-2" data-testid="button-prev-case">
                  <ArrowLeft className="w-4 h-4" />
                  {prevCase.name}
                </Button>
              </Link>
            ) : <div />}
            {nextCase ? (
              <Link href={nextCase.url}>
                <Button variant="ghost" size="sm" className="gap-2" data-testid="button-next-case">
                  {nextCase.name}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            ) : <div />}
          </div>
        </section>
      )}
      <MainFooter />
    </div>
  )
}
