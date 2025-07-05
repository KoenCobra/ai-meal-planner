"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { PricingTable } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";

const BillingPage = () => {
  const [tosAccepted, setTosAccepted] = useState(false);

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

      {/* Terms Agreement Section */}
      <div className="mb-8 p-6 bg-card border rounded-lg">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="tos-agreement"
            checked={tosAccepted}
            onCheckedChange={(checked) => setTosAccepted(checked === true)}
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="tos-agreement"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              I agree to the{" "}
              <Link
                href="/terms-of-service"
                className="text-primary underline font-semibold"
                rel="noopener noreferrer"
                target="_blank"
              >
                Terms of Service
              </Link>
            </label>
            <p className="text-xs text-muted-foreground">
              By subscribing, you agree to our Terms of Service and understand
              your subscription terms.
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Table */}
      <div className="mb-16 relative">
        <div
          className={`transition-opacity duration-300 ${
            tosAccepted ? "opacity-100" : "opacity-50 pointer-events-none"
          }`}
        >
          <PricingTable />
        </div>
        {!tosAccepted && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-lg">
            <div className="text-center p-6">
              <p className="text-sm text-muted-foreground mb-2">
                Please accept the Terms of Service to continue
              </p>
              <p className="text-xs text-muted-foreground">
                Check the box above to enable the pricing table
              </p>
            </div>
          </div>
        )}
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
