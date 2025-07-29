import {
  freeRecipeGenerationsLeft,
  hasUserActiveSubscription,
  updateFreeRecipeGenerationsLeft,
} from "@/lib/freeTrial";
import { Metadata } from "next";
import AskBubu from "./_components/AskBubu";

export const metadata: Metadata = {
  title: "Ask Bubu",
  description: "Generate recipes with Bubu AI",
};

const BubuAiPage = async () => {
  const hasActiveSubscription = await hasUserActiveSubscription();
  const generationsLeft = await freeRecipeGenerationsLeft();

  return (
    <AskBubu
      hasActiveSubscription={hasActiveSubscription}
      generationsLeft={generationsLeft}
      updateFreeRecipeGenerationsLeft={updateFreeRecipeGenerationsLeft}
    />
  );
};

export default BubuAiPage;
