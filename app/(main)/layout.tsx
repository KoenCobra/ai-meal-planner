import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import Navbar from "./_components/Navbar";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = await auth();
  if (userId) {
    redirect("/bubu-ai");
  }
  return (
    <div>
      <Navbar />
      <div className="container">{children}</div>
    </div>
  );
};

export default layout;
