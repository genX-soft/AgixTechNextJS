import { MainHeader } from "@/components/main-header";
import { MainFooter } from "@/components/main-footer";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Mail, Building2 } from "lucide-react";
import type { Metadata } from "next";
import FAQSection from "@/components/shared/FAQSection";
import { documentFAQs } from "@/lib/seo/faq-data";

export const metadata: Metadata = {
  title: "Boston Office | AGIX Technologies Location",
  description: "Visit AGIX Technologies at our Boston office. We build advanced agentic AI, workflow automation, and predictive analytics platforms for North American enterprises.",
};

export default function BostonLocationPage() {
  return (
    <>
      <MainHeader />
      <main className="min-h-screen bg-slate-950 pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <Badge variant="outline" className="mb-4 border-primary/40 bg-primary/10 text-primary">
              <MapPin className="w-4 h-4 mr-2" />
              AGIX Technologies Location
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              AGIX Technologies in Boston, MA
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Our Boston office serves as a major hub for AI systems engineering and enterprise intelligence solutions across North America. From here, our teams build advanced agentic AI, workflow automation, and predictive analytics platforms for some of the world's leading organizations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-8 bg-slate-900/50 p-8 rounded-2xl border border-slate-800">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3 text-foreground">
                <Building2 className="w-6 h-6 text-primary" />
                Office Details
              </h2>
              
              <div className="space-y-6 text-muted-foreground">
                <div className="flex gap-4">
                  <MapPin className="w-6 h-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Address</h3>
                    <p>99 Derby Street</p>
                    <p>Hingham, MA 02043</p>
                    <p>United States</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Phone className="w-6 h-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Phone</h3>
                    <p>+1 857 414 1353</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Mail className="w-6 h-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Email</h3>
                    <p>hello@agixtech.com</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-slate-800">
                <h3 className="font-semibold text-foreground mb-4">Why Boston?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Located in the Greater Boston area, we are surrounded by a thriving ecosystem of healthcare, technology, and financial services institutions. This strategic location enables us to work closely with enterprises seeking to implement operational AI, conversational AI, and robust decision intelligence systems. Our Boston team is dedicated to engineering reliable, compliant, and transformative AI systems for businesses across the United States.
                </p>
              </div>
            </div>

            <div className="h-full min-h-[500px] w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-900">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m2!1s0x89e3639eabce1d81%3A0xe24a68297cb73f1d!2s99%20Derby%20St%2C%20Hingham%2C%20MA%2002043%2C%20USA!5e0!3m2!1sen!2suk!4v1714400000000!5m2!1sen!2suk"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(85%) contrast(85%)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
                title="AGIX Technologies Boston Office Location"
              ></iframe>
            </div>
          </div>
        </div>
      </main>
      <FAQSection
        faqs={documentFAQs['location-boston']}
        title="AGIX Technologies Boston Office — FAQ"
        subtitle="Common questions about AGIX Technologies' Boston, MA office and our North American AI delivery capabilities."
      />
      <MainFooter />
    </>
  );
}
