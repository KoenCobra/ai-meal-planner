import { Metadata } from "next";
import AskBubu from "./_components/AskBubu";

export const metadata: Metadata = {
  title: "Ask Bubu",
  description: "Generate recipes with Bubu AI",
};

const BubuAiPage = async () => {
  return <AskBubu />;
};

export default BubuAiPage;
