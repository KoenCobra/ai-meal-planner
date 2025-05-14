import ErrorBoundary from "@/components/ui/ErrorBoundary";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import Navbar from "./_components/Navbar";

const layout = async ({ children }: { children: React.ReactNode }) => {
  // Use `auth()` helper to access the `has()` method
  const { has } = await auth();

  // Use `has()` method to check if user has a Plan
  const hasMasterMealLordPlan = has({ plan: "master_meal_lord" });
  const hasSeriousSizzlerPlan = has({ plan: "serious_sizzler" });
  const hasCuriousCookPlan = has({ plan: "curious_cook" });

  if (!hasMasterMealLordPlan && !hasSeriousSizzlerPlan && !hasCuriousCookPlan) {
    redirect("/billing");
  }

  return (
    <div>
      <Navbar />
      <div className="px-2 lg:max-w-4xl mx-auto md:max-w-2xl py-5">
        <ErrorBoundary>{children}</ErrorBoundary>
      </div>
    </div>
  );
};

export default layout;
