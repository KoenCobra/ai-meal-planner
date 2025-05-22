import ErrorBoundary from "@/components/ui/ErrorBoundary";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import Navbar from "./_components/Navbar";
import { BibiAiProvider } from "./bibi-ai/BibiAiContext";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const { has, userId } = await auth();

  if (!userId) {
    throw new Error("User not found");
  }

  const hasMasterMealLordPlan = has({ plan: "master_meal_lord" });
  const hasSeriousSizzlerPlan = has({ plan: "serious_sizzler" });
  const hasCuriousCookPlan = has({ plan: "curious_cook" });

  if (!hasMasterMealLordPlan && !hasSeriousSizzlerPlan && !hasCuriousCookPlan) {
    redirect("/billing");
  }

  return (
    <BibiAiProvider>
      <div>
        <Navbar />
        <div className="px-2 lg:max-w-4xl mx-auto md:max-w-2xl py-3 pb-16">
          <ErrorBoundary>{children}</ErrorBoundary>
        </div>
      </div>
    </BibiAiProvider>
  );
};

export default layout;
