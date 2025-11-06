import { Navigation } from "@/components/Navigation";

const CookiesPolicy = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="mb-6">Cookies Policy</h1>
            <p className="text-muted-foreground mb-8">Last updated: January 2024</p>

            <div className="space-y-8 prose prose-invert max-w-none">
              <section>
                <h2 className="text-2xl font-bold mb-4">1. What Are Cookies</h2>
                <p className="text-muted-foreground">
                  Cookies are small text files that are placed on your computer or mobile device when you visit our website. They are widely used to make websites work more efficiently and provide information to website owners.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">2. How We Use Cookies</h2>
                <p className="text-muted-foreground mb-4">
                  Currently Natty uses cookies for several purposes:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>To keep you signed in to your account</li>
                  <li>To remember your preferences and settings</li>
                  <li>To understand how you use our website</li>
                  <li>To improve our services and user experience</li>
                  <li>To show you relevant content and advertisements</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">3. Types of Cookies We Use</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Essential Cookies</h3>
                    <p className="text-muted-foreground">
                      These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility. You cannot opt-out of these cookies.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2">Analytics Cookies</h3>
                    <p className="text-muted-foreground">
                      These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website and services.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2">Functional Cookies</h3>
                    <p className="text-muted-foreground">
                      These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we use on our pages.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2">Marketing Cookies</h3>
                    <p className="text-muted-foreground">
                      These cookies are used to track visitors across websites to display ads that are relevant and engaging for individual users, thereby making them more valuable for publishers and advertisers.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">4. Third-Party Cookies</h2>
                <p className="text-muted-foreground mb-4">
                  In addition to our own cookies, we may also use various third-party cookies to report usage statistics and deliver advertisements. These include:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Google Analytics for website analytics</li>
                  <li>Social media platforms for social sharing features</li>
                  <li>Advertising partners for targeted advertising</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">5. Managing Cookies</h2>
                <p className="text-muted-foreground mb-4">
                  You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Using our cookie consent tool when you first visit our website</li>
                  <li>Adjusting your browser settings to refuse cookies</li>
                  <li>Deleting cookies from your browser</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  Please note that if you choose to block or delete cookies, you may not be able to access all or parts of our website, and your user experience may be affected.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">6. Cookie Duration</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    <strong>Session Cookies:</strong> These are temporary cookies that expire when you close your browser.
                  </p>
                  <p>
                    <strong>Persistent Cookies:</strong> These remain on your device until they expire or you delete them. The duration varies depending on the purpose of the cookie.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">7. Updates to This Policy</h2>
                <p className="text-muted-foreground">
                  We may update this Cookies Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We encourage you to review this policy periodically.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">8. Contact Us</h2>
                <p className="text-muted-foreground">
                  If you have any questions about our use of cookies, please contact us at privacy@currentlynatty.com
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiesPolicy;
