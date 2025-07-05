import CookiePreferences from "@/components/CookiePreferences";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn about how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Cookie Policy</CardTitle>
            <CardDescription>
              Information about how we use cookies and similar technologies
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <section>
                <h3 className="text-lg font-semibold mb-2">
                  What Are Cookies?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Cookies are small text files that are placed on your device
                  when you visit our website. They help us provide you with a
                  better experience by remembering your preferences and
                  understanding how you use our site.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-2">
                  Types of Cookies We Use
                </h3>
                <div className="space-y-3">
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-medium">Necessary Cookies</h4>
                    <p className="text-sm text-muted-foreground">
                      These cookies are essential for the website to function
                      properly. They enable basic features like page navigation
                      and access to secure areas. The website cannot function
                      properly without these cookies.
                    </p>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-medium">Functional Cookies</h4>
                    <p className="text-sm text-muted-foreground">
                      These cookies enable enhanced functionality and
                      personalization, such as remembering your language
                      preferences, login credentials, and customized settings.
                    </p>
                  </div>

                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-medium">Analytics Cookies</h4>
                    <p className="text-sm text-muted-foreground">
                      These cookies help us understand how visitors interact
                      with our website by collecting and reporting information
                      anonymously. This helps us improve our website and
                      services.
                    </p>
                  </div>

                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-medium">Marketing Cookies</h4>
                    <p className="text-sm text-muted-foreground">
                      These cookies are used to track visitors across websites
                      to display relevant advertisements. They may be used to
                      build a profile of your interests and show you relevant
                      ads on other sites.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-2">
                  Managing Your Cookie Preferences
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  You can manage your cookie preferences at any time using the
                  controls below. Please note that disabling certain cookies may
                  affect the functionality of our website.
                </p>
              </section>
            </div>
          </CardContent>
        </Card>

        <CookiePreferences />

        <Card>
          <CardHeader>
            <CardTitle>Personal Information We Collect</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <section>
              <h3 className="text-lg font-semibold mb-2">
                Account Information
              </h3>
              <p className="text-sm text-muted-foreground">
                When you create an account, we collect information such as your
                email address, username, and any profile information you choose
                to provide.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-2">Usage Information</h3>
              <p className="text-sm text-muted-foreground">
                We collect information about how you use our service, including
                recipes you create, menus you build, and features you interact
                with.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-2">Device Information</h3>
              <p className="text-sm text-muted-foreground">
                We may collect information about the device you use to access
                our service, including browser type, operating system, and IP
                address.
              </p>
            </section>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How We Use Your Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• To provide and maintain our service</li>
              <li>• To personalize your experience</li>
              <li>• To improve our service and develop new features</li>
              <li>• To communicate with you about updates and support</li>
              <li>• To ensure the security of our service</li>
              <li>• To comply with legal obligations</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Sharing and Disclosure</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              We do not sell, trade, or otherwise transfer your personal
              information to third parties without your consent, except as
              described in this policy:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                • With service providers who assist us in operating our service
              </li>
              <li>• When required by law or to protect our rights</li>
              <li>
                • In connection with a business transaction (merger,
                acquisition, etc.)
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Rights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              You have the right to:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Access your personal information</li>
              <li>• Update or correct your information</li>
              <li>• Delete your account and associated data</li>
              <li>• Restrict or object to certain processing</li>
              <li>• Data portability</li>
              <li>• Withdraw consent where applicable</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              If you have any questions about this Privacy Policy or our data
              practices, please contact us at privacy@bubu-ai.com.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
