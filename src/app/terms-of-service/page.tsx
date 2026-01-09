'use client'

import { MainHeader } from "@/components/main-header";
import { MainFooter } from "@/components/main-footer";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background">
      <MainHeader />
      
      <main className="pt-24 lg:pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Terms of Use
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Terms of service for AGIX Technologies, a leading AI and software development company.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="prose prose-lg dark:prose-invert max-w-none"
            data-testid="text-terms-content"
          >
            <p>
              These Terms of Use govern your access to and use of the official website of AGIX Technologies, a technology company offering advanced AI services. By visiting or utilizing this site, you consent to adhere to the outlined terms. If you do not agree with these terms, you may not access or use this website.
            </p>

            <h2>1. Acceptance of Terms</h2>
            <p>
              By using this website, you accept that you have reviewed, understood, and agree to follow these terms as well as all applicable laws and regulations. Unauthorized use of the site may violate intellectual property laws and lead to legal penalties.
            </p>

            <h2>2. Intellectual Property and Usage Restrictions</h2>
            <p>
              All content on the AGIX Technologies website, including software, text, graphics, logos, and service marks, is the exclusive property of AGIX Technologies or its licensors. It is intended solely for informational viewing. Users are not allowed to copy, download, distribute, or reuse any content without prior written permission. AGIX Technologies reserves the right to limit or deny access at any time.
            </p>

            <h2>3. Disclaimer</h2>
            <p>
              AGIX Technologies makes no guarantees, express or implied, about the accuracy, completeness, or reliability of the information or materials presented. The corporation disclaims all warranties, including those of merchantability and fitness for a particular purpose.
            </p>

            <h2>4. Limitation of Liability</h2>
            <p>
              AGIX Technologies and its affiliates are not responsible for any direct, indirect, or consequential damages resulting from your use or inability to access the website. This includes, but is not limited to, data corruption, business disruption, or financial loss. Some jurisdictions may not permit such exclusions, so these restrictions may not apply to you.
            </p>

            <h2>5. Content Accuracy</h2>
            <p>
              While AGIX Technologies strives to maintain current and accurate information, the website may occasionally contain errors or outdated material. The company may update or correct content at any time without prior notice, though it is not required to do so.
            </p>

            <h2>6. Modifications to Terms</h2>
            <p>
              AGIX Technologies reserves the right to update or revise these Terms of Use at its discretion without prior notification. By continuing to use the website after updates, you accept the revised terms. To stay informed about any changes, we recommend users review this page periodically.
            </p>
          </motion.div>
        </div>
      </main>

      <MainFooter />
    </div>
  );
}
