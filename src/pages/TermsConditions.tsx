import { Navigation } from "@/components/Navigation";

const TermsConditions = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="mb-6">Terms & Conditions</h1>
            <p className="text-muted-foreground mb-8">Last updated: January 2024</p>

            <div className="space-y-8 prose prose-invert max-w-none">
              <section>
                <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground">
                  By accessing and using Currently Natty, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">2. Use License</h2>
                <p className="text-muted-foreground mb-4">
                  Permission is granted to temporarily access the materials (information or software) on Currently Natty for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose</li>
                  <li>Attempt to decompile or reverse engineer any software</li>
                  <li>Remove any copyright or proprietary notations</li>
                  <li>Transfer the materials to another person</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">3. Account Terms</h2>
                <p className="text-muted-foreground mb-4">
                  When you create an account with us, you must provide accurate, complete, and current information. You are responsible for:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Maintaining the security of your account</li>
                  <li>All activities that occur under your account</li>
                  <li>Notifying us immediately of any unauthorized use</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">4. Subscription and Payments</h2>
                <p className="text-muted-foreground mb-4">
                  Paid subscriptions are billed in advance on a monthly or annual basis. All fees are non-refundable except as required by law. You may cancel your subscription at any time, and you will continue to have access until the end of your billing period.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">5. Medical Disclaimer</h2>
                <p className="text-muted-foreground mb-4">
                  The information provided on Currently Natty is for educational purposes only and is not intended as medical advice. Always consult with a qualified healthcare professional before starting any fitness or nutrition program.
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>We are not liable for any injuries or health issues</li>
                  <li>Exercise at your own risk</li>
                  <li>Seek professional medical advice when needed</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">6. User Content</h2>
                <p className="text-muted-foreground">
                  By posting content on our platform, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, and display such content. You retain all ownership rights to your content.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">7. Prohibited Uses</h2>
                <p className="text-muted-foreground mb-4">
                  You may not use our service:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>For any unlawful purpose</li>
                  <li>To harass, abuse, or harm others</li>
                  <li>To impersonate or deceive others</li>
                  <li>To upload viruses or malicious code</li>
                  <li>To collect information about other users</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">8. Termination</h2>
                <p className="text-muted-foreground">
                  We may terminate or suspend your account immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">9. Limitation of Liability</h2>
                <p className="text-muted-foreground">
                  In no event shall Currently Natty or its suppliers be liable for any damages arising out of the use or inability to use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">10. Changes to Terms</h2>
                <p className="text-muted-foreground">
                  We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through our platform.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">11. Contact Information</h2>
                <p className="text-muted-foreground">
                  Questions about the Terms should be sent to us at legal@currentlynatty.com
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
