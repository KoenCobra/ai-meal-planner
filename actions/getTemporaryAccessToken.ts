"use server";

import { currentUser } from "@clerk/nextjs/server";
// Initialize Schematic SDK
import { SchematicClient } from "@schematichq/schematic-typescript-node";
const apiKey = process.env.SCHEMATIC_API_KEY;
const client = new SchematicClient({ apiKey });

// Get a temporary access token
export async function getTemporaryAccessToken() {
  const user = await currentUser();

  if (!user) {
    throw new Error(
      "User not found when trying to get temporary access token from Schematic",
    );
  }

  const resp = await client.accesstokens.issueTemporaryAccessToken({
    resourceType: "company",
    lookup: { id: user.id },
  });

  return resp.data?.token;
}
