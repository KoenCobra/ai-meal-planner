"use client";

import React, { useState } from "react";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import DiscoverRecipeCard from "./DiscoverRecipeCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useRecipeCarousel } from "../hooks";

interface RecipeCarouselProps {
  dishType: string;
}

const RecipeCarousel = ({ dishType }: RecipeCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const { data, isError, isLoading } = useRecipeCarousel(dishType);

  if (isError) return <div>Something went wrong</div>;

  const scrollPrev = () => {
    if (api) {
      api.scrollPrev();
    }
  };

  const scrollNext = () => {
    if (api) {
      api.scrollNext();
    }
  };

  if (isLoading)
    return (
      <div className="grid grid-cols-12 sm:h-[18rem] shadow-sm rounded-md overflow-hidden">
        <div className="col-span-12 sm:col-span-7">
          <Skeleton className="h-[25rem] sm:h-full sm:w-full" />
        </div>
        <div className="flex flex-col gap-6 col-span-12 sm:col-span-5 py-5 sm:px-6">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </div>
    );

  return (
    <div>
      <div className="flex items-center justify-between mb-2 md:hidden">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full border border-border"
          onClick={scrollPrev}
        >
          <ArrowLeft className="h-8 w-8" />
        </Button>

        <h3 className="text-sm text-muted-foreground">
          {dishType.toUpperCase()}
        </h3>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full border border-border"
          onClick={scrollNext}
        >
          <ArrowRight className="h-8 w-8" />
        </Button>
      </div>
      <h3 className="text-sm text-muted-foreground hidden md:block text-center mb-1">
        {dishType.toUpperCase()}
      </h3>

      <Carousel
        setApi={setApi}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {data?.recipes?.map((recipe) => (
            <CarouselItem key={recipe.id}>
              <DiscoverRecipeCard
                key={recipe.id}
                id={recipe.id}
                title={recipe.title}
                readyInMinutes={recipe.readyInMinutes}
                image={recipe.image}
                diets={recipe.diets}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden md:block">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </div>
  );
};

export default RecipeCarousel;
