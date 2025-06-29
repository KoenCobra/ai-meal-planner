import { Metadata } from "next";
import AskBubu from "./_components/AskBubu";

export const metadata: Metadata = {
  title: "Bubu AI - Ask Bubu",
  description: "Generate recipes with Bubu AI",
};

const BubuAiPage = () => {
  return <AskBubu />;
};

export default BubuAiPage;
