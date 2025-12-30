import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function scrollToFormSection() {
  const possibleIds = ["cta-form", "lead-form", "contact", "demo-form"];
  for (const id of possibleIds) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      return true;
    }
  }
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  return false;
}

function scrollToToolsSection() {
  const possibleIds = ["interactive-tools", "tools", "solutions", "services"];
  for (const id of possibleIds) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      return true;
    }
  }
  const sections = document.querySelectorAll("section");
  if (sections.length > 2) {
    sections[2].scrollIntoView({ behavior: "smooth", block: "start" });
    return true;
  }
  return false;
}

export function FloatingChatCta() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        className="fixed bottom-6 right-6 z-50"
      >
        {isExpanded ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <Card className="w-80 shadow-2xl border-primary/20 bg-slate-900/95 backdrop-blur-sm" data-testid="card-floating-cta">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between gap-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    Ready to Transform?
                  </CardTitle>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="shrink-0"
                    onClick={() => setIsExpanded(false)}
                    data-testid="button-floating-cta-close"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Let's discuss how AI can solve your specific challenges.
                </p>
                <Button 
                  className="w-full bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/25"
                  onClick={() => { scrollToFormSection(); setIsExpanded(false); }}
                  data-testid="button-floating-cta-contact"
                >
                  Schedule a Consultation
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => { scrollToToolsSection(); setIsExpanded(false); }}
                  data-testid="button-floating-cta-tools"
                >
                  Explore Solutions
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              className="rounded-full w-14 h-14 p-0 bg-orange-500 hover:bg-orange-600 shadow-xl shadow-orange-500/30"
              onClick={() => setIsExpanded(true)}
              data-testid="button-floating-cta-toggle"
            >
              <MessageCircle className="w-6 h-6" />
            </Button>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
