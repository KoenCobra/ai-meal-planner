"use client";

import { Button } from "@/components/ui/button";
import {
  Beef,
  Coffee,
  Cookie,
  Fish,
  Salad,
  Timer,
  Utensils,
  Wheat,
} from "lucide-react";

interface SearchSuggestionsProps {
  onSuggestionClick: (suggestion: string) => void;
}

export const SearchSuggestions = ({
  onSuggestionClick,
}: SearchSuggestionsProps) => {
  const suggestions = [
    { name: "Quick Meals", icon: <Timer className="h-4 w-4 mr-2" /> },
    { name: "Vegetarian", icon: <Salad className="h-4 w-4 mr-2" /> },
    { name: "Breakfast", icon: <Coffee className="h-4 w-4 mr-2" /> },
    { name: "Dinner", icon: <Utensils className="h-4 w-4 mr-2" /> },
    { name: "Desserts", icon: <Cookie className="h-4 w-4 mr-2" /> },
    { name: "Seafood", icon: <Fish className="h-4 w-4 mr-2" /> },
    { name: "Pasta", icon: <Wheat className="h-4 w-4 mr-2" /> },
    { name: "Beef", icon: <Beef className="h-4 w-4 mr-2" /> },
  ];

  return (
    <div className="mt-8">
      <h3 className="text-lg font-medium mb-4">Popular Searches</h3>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion) => (
          <Button
            key={suggestion.name}
            variant="outline"
            className="flex items-center"
            onClick={() => onSuggestionClick(suggestion.name)}
          >
            {suggestion.icon}
            {suggestion.name}
          </Button>
        ))}
      </div>
    </div>
  );
};
