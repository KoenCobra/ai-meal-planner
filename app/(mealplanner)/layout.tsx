import React from "react";
import Navbar from "./_components/Navbar";
import ErrorBoundary from "@/components/ui/ErrorBoundary";

const layout = async ({ children }: { children: React.ReactNode }) => {
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
