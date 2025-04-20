import React from "react";
import Navbar from "./_components/Navbar";

const layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <div className="px-2 lg:max-w-4xl mx-auto md:max-w-2xl py-5">
        {children}
      </div>
    </div>
  );
};

export default layout;
