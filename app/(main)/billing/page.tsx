import { PricingTable } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Pricing for Bubu AI",
};

const page = () => {
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
        <PricingTable />
      </div>

      {/* Footer Section */}
      <footer className="border-t pt-8 pb-8">
        <div className="text-center text-sm text-muted-foreground">
          <p className="mb-2">
            Have questions about our pricing?
            <a
              href="mailto:support@bubu-ai.com"
              className="ml-1 text-primary hover:underline"
            >
              Contact our support team
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default page;
