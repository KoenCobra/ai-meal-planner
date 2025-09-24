export type MealType = "breakfast" | "lunch" | "dinner" | "other";

export interface TabConfig {
  title: string;
  key: MealType;
}

export const tabs: TabConfig[] = [
  {
    title: "Breakfast",
    key: "breakfast",
  },
  {
    title: "Lunch",
    key: "lunch",
  },
  {
    title: "Dinner",
    key: "dinner",
  },
  {
    title: "Other",
    key: "other",
  },
];
