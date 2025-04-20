export type DiscoverRecipeItem = {
  recipes: {
    id: string;
    title: string;
    readyInMinutes: number;
    image: string;
    diets: string[];
  }[];
};

export type RecipeDetail = {
  id: string;
  title: string;
  readyInMinutes: number;
  servings: number;
  image: string;
  instructions: string;
  extendedIngredients: ExtendedIngredient[];
  nutrition: Nutrition;
  caloricBreakdown: CaloricBreakdown;
  diets: string[];
  analyzedInstructions: AnalyzedInstruction[];
};

export type ExtendedIngredient = {
  id: string;
  originalName: string;
  image: string;
  measures: {
    us: {
      amount: number;
      unitShort: string;
    };
    metric: {
      amount: number;
      unitShort: string;
    };
  };
};

export type Nutrition = {
  nutrients: {
    name: string;
    amount: number;
    unit: string;
    percentOfDailyNeeds: number;
  }[];
};

export type CaloricBreakdown = {
  percentProtein: number;
  percentFat: number;
  percentCarbs: number;
};

export type AnalyzedInstruction = {
  name: string;
  steps: [
    {
      number: number;
      step: string;
      ingredients: [];
      equipment: [
        {
          id: number;
          name: string;
          localizedName: string;
          image: string;
        },
      ];
    },
    {
      number: number;
      step: string;
      ingredients: [];
      equipment: [];
    },
  ];
};
