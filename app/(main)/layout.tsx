import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import Navbar from "./_components/Navbar";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const { has, userId } = await auth();

  if (userId && !has({ plan: "active_subscription" })) {
    redirect("/billing");
  }

  if (userId && has({ plan: "active_subscription" })) {
    redirect("/bubu-ai");
  }

  return (
    <div>
      <Navbar />
      <div className="container px-2">{children}</div>
    </div>
  );
};

export default layout;
