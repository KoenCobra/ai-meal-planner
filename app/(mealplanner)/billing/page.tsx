import { PricingTable } from "@clerk/nextjs";

const BillingPage = () => {
  return (
    <div className="max-w-4xl mt-8 mx-auto px-4">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Choose Your Plan
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Unlock the full potential of Bubu AI with our flexible pricing plans.
          Generate unlimited recipes, analyze food images, and create
          personalized meal plans.
        </p>
      </div>

      {/* Pricing Table */}
      <div className="mb-16">
        <PricingTable newSubscriptionRedirectUrl="/bubu-ai" />
      </div>

      {/* Payment Completion Notice */}
      <div className="p-6 bg-card border rounded-lg">
        <div className="flex items-start space-x-3">
          <div>
            <h3 className="text-sm font-semibold  mb-1">
              Important: Check Your Email After Payment
            </h3>
            <p className="text-sm text-muted-foreground">
              After completing your payment, please check your email for a
              confirmation message and access details.
              <strong className="font-medium">
                {" "}
                Don&apos;t forget to check your spam or junk folder
              </strong>{" "}
              if you don&apos;t see the email in your inbox within a few
              minutes.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="border-t pt-8 pb-8">
        <div className="text-center text-sm text-muted-foreground">
          <p className="mb-2">
            Have questions about our pricing?
            <a
              href="mailto:info@bubuaimealplanner.com"
              className="ml-1 text-primary hover:underline"
              target="_blank"
            >
              Contact our support team
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default BillingPage;
