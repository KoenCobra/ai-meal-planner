/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import { Clock, Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

interface DiscoverRecipeCardProps {
  id: string;
  title: string;
  readyInMinutes: number;
  image: string;
  diets: string[];
}
const DiscoverRecipeCard = ({
  id,
  title,
  readyInMinutes,
  image,
  diets,
}: DiscoverRecipeCardProps) => {
  return (
    <div className="grid grid-cols-12 sm:h-[18rem] border shadow-sm border-border rounded-md overflow-hidden relative">
      <Link href={`/discover/${id}`} className="col-span-12 sm:col-span-7 ">
        <img
          src={
            image
              ? `https://img.spoonacular.com/recipes/${id}-636x393.jpg`
              : "/images/image-placeholder.jpeg"
          }
          alt={title || ""}
          className="object-cover w-full h-full"
        />
      </Link>

      <Link
        href={`/discover/${id}`}
        className="flex flex-col col-span-12 sm:col-span-5 py-5 px-6"
      >
        <h3 className="font-normal text-lg leading-6">{title.toUpperCase()}</h3>
        <p className="text-muted-foreground text-xs flex items-center gap-1">
          <Clock size={14} />
          {readyInMinutes || 0} min
        </p>
        <p className="pt-10 text-muted-foreground text-xs mb-3">
          {diets?.join(" • ")}
        </p>
      </Link>

      <Button
        variant="secondary"
        className="rounded-full p-5 absolute bottom-5 z-10 right-5"
      >
        Add to a menu
        <Plus size={14} />
      </Button>
    </div>
  );
};

export default DiscoverRecipeCard;
