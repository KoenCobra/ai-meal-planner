import SchematicComponent from "@/components/schematic/SchematicComponent";
import React from "react";

const ManagePlan = () => {
  return (
    <div className="xl:max-w-5xl mx-auto p-4 md:p-0">
      <h1 className="text-2xl font-bold mb-4 my-8">Manage Your Plan</h1>
      <p className="text-gray-600 mb-8">
        Manage your plan and billing information.
      </p>
      <SchematicComponent
        componentId={process.env.NEXT_PUBLIC_SCHEMATIC_COMPONENT_ID!}
      />
    </div>
  );
};

export default ManagePlan;
