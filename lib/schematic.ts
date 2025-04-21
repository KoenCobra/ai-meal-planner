import { SchematicClient } from "@schematichq/schematic-typescript-node";

console.log(process.env);
if (!process.env.SCHEMATIC_API_KEY) {
  throw new Error("SCHEMATIC_API_KEY is not set");
}

export const client = new SchematicClient({
  apiKey: process.env.SCHEMATIC_API_KEY,
  cacheProviders: {
    flagChecks: [],
  },
});
