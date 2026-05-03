import { MainHeader } from "@/components/main-header";
import { MainFooter } from "@/components/main-footer";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Mail, Building2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "London Office | AGIX Technologies Location",
  description: "Visit AGIX Technologies at our London office. Specializing in fintech, insurance, and enterprise AI automation tailored for rigorous regulatory environments.",
};

export default function LondonLocationPage() {
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
              AGIX Technologies in London, UK
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Our UK office drives AI systems engineering for Europe and beyond. Specializing in fintech, insurance, and enterprise automation, our London-based team designs AI solutions tailored for stringent regulatory environments including GDPR and FCA compliance.
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
                    <p>61 Bridge Street</p>
                    <p>Kington, HR5 3DJ</p>
                    <p>United Kingdom</p>
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
                <h3 className="font-semibold text-foreground mb-4">Why the UK?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  The UK is a global leader in financial services, legal tech, and enterprise innovation. Our UK office allows us to closely support our European clients, ensuring their agentic AI and workflow automation systems are deployed securely and governed correctly. We focus heavily on explainable AI, making our solutions ideal for businesses that require high accountability and strict data sovereignty.
                </p>
              </div>
            </div>

            <div className="h-full min-h-[500px] w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-900">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m2!1s0x487042a278ecff95%3A0xe54d21dfc95c898c!2s61%20Bridge%20St%2C%20Kington%20HR5%203DJ%2C%20UK!5e0!3m2!1sen!2sus!4v1714400000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(85%) contrast(85%)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
                title="AGIX Technologies London Office Location"
              ></iframe>
            </div>
          </div>
        </div>
      </main>
      <MainFooter />
    </>
  );
}
