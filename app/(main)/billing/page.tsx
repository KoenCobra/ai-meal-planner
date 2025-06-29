import { PricingTable } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Pricing for Bubu AI",
};

const page = () => {
  return (
    <div className="max-w-xl mt-8 mx-auto px-2">
      <PricingTable />
    </div>
  );
};

export default page;
