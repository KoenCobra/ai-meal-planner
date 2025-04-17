import { getTemporaryAccessToken } from "@/actions/getTemporaryAccessToken";
import React from "react";
import SchematicEmbedComponent from "./schematicEmbed";

const SchematicComponent = async ({ componentId }: { componentId: string }) => {
  if (!componentId) return null;

  const accessToken = await getTemporaryAccessToken();

  if (!accessToken)
    throw new Error(
      "No access token found for user when trying to render Schematic component",
    );

  return (
    <SchematicEmbedComponent
      accessToken={accessToken}
      componentId={componentId}
    />
  );
};

export default SchematicComponent;
