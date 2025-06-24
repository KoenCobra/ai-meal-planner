import { Id } from "@/convex/_generated/dataModel";

export type Recipe = {
  _id: Id<"recipes">;
  title: string;
  readyInMinutes: number;
  servings: number;
  imageId?: Id<"_storage">;
  blurDataURL?: string;
  categories: string[];
  dishType: string;
};
