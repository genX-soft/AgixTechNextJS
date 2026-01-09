'use client'

import { MainHeader } from "@/components/main-header";
import { MainFooter } from "@/components/main-footer";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";

export default function PrivacyPolicyPage() {
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
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              AGIX Technologies is committed to protecting your personal information with transparency and choice, ensuring the privacy of our clients and website visitors.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="prose prose-lg dark:prose-invert max-w-none"
            data-testid="text-privacy-content"
          >
            <h2>Our Policies</h2>
            <p>
              At AGIX Technologies, we make sure to safeguard your privacy and ensure the overall confidentiality of your data. This privacy policy describes the method of collecting your data, how we use it to enhance the website, and provide you with tailored solutions. By using this website, you agree to read this agreement with the information outlined below.
            </p>

            <h2>1. Types of Information We Collect</h2>
            <p>To provide a personalized and enhanced experience, we collect both identifiable and non-identifiable data.</p>
            <ul>
              <li>
                <strong>Personal Data:</strong> This may encompass your name, electronic mail ID, phone number, and any additional details you willingly provide via inquiry forms, direct email exchanges, or requests for services.
              </li>
              <li>
                <strong>Non-Personal Data:</strong> This refers to technical and usage-related details such as IP address, browser type, device specifics, and user interaction patterns.
              </li>
            </ul>

            <h2>2. Use of Collected Information</h2>
            <p>We utilize the information collected for several purposes, including:</p>
            <ul>
              <li>
                <strong>Service Delivery:</strong> To offer, improve, and maintain our core services, such as AI-driven solutions, workplace optimization tools, and digital innovation support.
              </li>
              <li>
                <strong>Customer Communication:</strong> To respond to your inquiries, provide requested information, and keep you informed about new solutions, promotions, or updates. You may opt out of marketing communications at any point.
              </li>
              <li>
                <strong>User Experience Enhancement:</strong> Examine website usage to find ways to improve usability and performance.
              </li>
            </ul>

            <h2>3. Cookies and Tracking Tools</h2>
            <p>
              AGIX Technologies website uses cookies and similar technologies to improve functionality and user engagement. These small files, stored on your device, allow us to collect insights into visitor behavior and website activity. Cookie settings can be disabled in your browser, but it may affect certain functionality.
            </p>

            <h2>4. Data Protection and Security</h2>
            <p>
              At AGIX Technologies, we take necessary measures to safeguard your personal information against unauthorized access, alteration, and destruction. Our website employs encryption technologies and secure server protocols, ensuring data protection. However, it's important to note that no internet-based system can guarantee absolute security.
            </p>

            <h2>5. Information Sharing Policy</h2>
            <p>
              Your personal information is never sold to or shared with outside parties for their marketing needs. Information may only be disclosed to trusted partners who assist in service delivery or help fulfill contractual obligations. These outside parties have agreed to keep your data secure and use it only for the purposes specified in their contracts with us.
            </p>

            <h2>6. Children's Privacy</h2>
            <p>
              Children under the age of 13 are not permitted to use AGIX Technologies' website, and we do not intentionally gather personal data about them. If we discover that a child has submitted personal data, we will take swift action to remove it from our records.
            </p>

            <h2>7. Revisions to This Policy</h2>
            <p>
              AGIX Technologies reserves the right to revise this privacy policy as needed to reflect changes in operations or to comply with legal requirements. Updates will be posted directly on this page. We encourage users to revisit this policy periodically to stay informed about how their information is protected.
            </p>
          </motion.div>
        </div>
      </main>

      <MainFooter />
    </div>
  );
}
