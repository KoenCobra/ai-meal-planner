import { Skeleton } from "@/components/ui/skeleton";

// Generic menu item skeleton
export const MenuItemSkeleton = () => (
  <div className="border border-border rounded-md">
    <div className="flex items-center justify-between">
      <div className="p-4 grow">
        <Skeleton className="h-6 w-48" />
      </div>
      <div className="pl-6 pr-2 md:px-6">
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    </div>
  </div>
);

// Menu list loading skeleton
export const MenuListSkeleton = () => (
  <div className="animate-in fade-in duration-500">
    <div className="flex justify-center">
      <Skeleton className="h-10 w-32 mt-4 mb-6" />
    </div>
    <div className="space-y-6">
      {[1, 2, 3, 4].map((i) => (
        <MenuItemSkeleton key={i} />
      ))}
    </div>
  </div>
);

// Recipe card skeleton
export const RecipeCardSkeleton = () => (
  <div className="border-0 rounded-lg overflow-hidden">
    <Skeleton className="w-full aspect-video" />
    <div className="p-4 space-y-3">
      <Skeleton className="h-6 w-3/4" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
      <div className="flex gap-2 pt-2">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-5 w-12 rounded-full" />
      </div>
    </div>
  </div>
);

// Recipe grid loading skeleton
export const RecipeGridSkeleton = ({ count = 4 }: { count?: number } = {}) => (
  <div className="container mx-auto py-8 animate-in fade-in duration-500">
    <div className="text-center mb-8 space-y-4">
      <Skeleton className="h-12 w-64 mx-auto" />
      <Skeleton className="h-12 w-80 mx-auto" />
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <RecipeCardSkeleton key={index} />
      ))}
    </div>
  </div>
);

// Generic content loading skeleton with header
export const ContentWithHeaderSkeleton = ({
  itemCount = 4,
}: {
  itemCount?: number;
} = {}) => (
  <div className="container mx-auto py-8 animate-in fade-in duration-500">
    <div className="text-center mb-8">
      <Skeleton className="h-12 w-64 mx-auto mb-4" />
      <Skeleton className="h-12 w-80 mx-auto" />
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: itemCount }).map((_, index) => (
        <RecipeCardSkeleton key={index} />
      ))}
    </div>
  </div>
);
