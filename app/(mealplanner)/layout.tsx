import { freeRecipeGenerationsLeft } from "@/lib/freeTrial";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import Navbar from "./_components/Navbar";
import { BubuAiProvider } from "./bubu-ai/BubuAiContext";
import { SearchProvider } from "./search/_context/SearchProvider";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  await freeRecipeGenerationsLeft();

  return (
    <BubuAiProvider>
      <SearchProvider>
        <div>
          <Navbar />
          <div className="px-2 lg:max-w-4xl mx-auto md:max-w-2xl py-3 pb-16">
            {children}
          </div>
        </div>
      </SearchProvider>
    </BubuAiProvider>
  );
};

export default layout;
