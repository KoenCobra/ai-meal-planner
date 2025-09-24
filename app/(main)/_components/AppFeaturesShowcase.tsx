import { Sparkles } from "lucide-react";
import Image from "next/image";

const AppFeaturesShowcase = () => {
  return (
    <div className="relative mx-auto max-w-5xl mb-32">
      {/* Main Showcase Title */}
      <div className="text-center mb-16">
        <h3 className="text-3xl md:text-4xl font-bold mb-4">
          Experience{" "}
          <span className="bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
            Bubu AI
          </span>{" "}
          in Action
        </h3>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover intelligent recipe search, smart menu planning, seamless
          grocery management, and AI-powered culinary assistance
        </p>
      </div>

      {/* Example 1: Handwritten Recipe Transformation */}
      <div className="mb-20">
        <div className="grid lg:grid-cols-5 gap-6 items-center">
          {/* Input: Handwritten Recipe */}
          <div className="lg:col-span-2 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-400/20 dark:from-blue-400/20 dark:to-blue-300/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
            <div className="relative bg-white/90 dark:bg-zinc-900/90 border-2 border-blue-200/50 dark:border-blue-400/30 rounded-3xl p-6 shadow-2xl backdrop-blur-sm hover:shadow-3xl transition-all duration-500 group-hover:scale-105">
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">
                      Handwritten Recipe
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Traditional family recipe
                    </p>
                  </div>
                </div>
                <div className="aspect-[4/5] bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/50 dark:to-blue-900/30 rounded-2xl overflow-hidden border-2 border-blue-200/30 dark:border-blue-400/20">
                  <Image
                    src="/images/handwrittenrecipe.webp"
                    alt="Handwritten thumbprint cookies recipe on wooden cutting board"
                    width={500}
                    height={625}
                    quality={100}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
              <div className="text-xs text-muted-foreground text-center bg-blue-50/50 dark:bg-blue-950/30 rounded-lg p-2">
                <span className="font-medium">Upload:</span> Handwritten
                recipes, cookbook pages, recipe cards
              </div>
            </div>
          </div>

          {/* Transformation Arrow */}
          <div className="lg:col-span-1 flex justify-center items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 rounded-full blur-lg opacity-30 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 p-6 rounded-full shadow-xl">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </div>
            {/* Mobile arrow (pointing down, next to sparkle) */}
            <div className="lg:hidden ml-4">
              <div className="flex flex-col items-center">
                <div className="w-0.5 h-12 bg-gradient-to-b from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300"></div>
                <div className="w-0 h-0 border-t-6 border-t-blue-600 dark:border-t-blue-400 border-l-3 border-l-transparent border-r-3 border-r-transparent"></div>
              </div>
            </div>
            {/* Desktop arrow (pointing right) */}
            <div className="hidden lg:block ml-4">
              <div className="flex items-center">
                <div className="w-12 h-0.5 bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300"></div>
                <div className="w-0 h-0 border-l-6 border-l-blue-600 dark:border-l-blue-400 border-t-3 border-t-transparent border-b-3 border-b-transparent"></div>
              </div>
            </div>
          </div>

          {/* Output: AI Generated Recipe */}
          <div className="lg:col-span-2 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-400/20 dark:from-blue-400/20 dark:to-blue-300/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
            <div className="relative bg-white/90 dark:bg-zinc-900/90 border-2 border-blue-200/50 dark:border-blue-400/30 rounded-3xl p-6 shadow-2xl backdrop-blur-sm hover:shadow-3xl transition-all duration-500 group-hover:scale-105">
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">
                      <span className="bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
                        Bubu AI
                      </span>{" "}
                      Generated Recipe
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Complete digital recipe
                    </p>
                  </div>
                </div>
                <div className="aspect-[4/5] bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/50 dark:to-blue-900/30 rounded-2xl overflow-hidden border-2 border-blue-200/30 dark:border-blue-400/20">
                  <Image
                    src="/images/handwrittenrecipeoutput.png"
                    alt="AI generated thumbprint cookies recipe with detailed information"
                    width={500}
                    height={625}
                    quality={100}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs text-center">
                <div className="bg-blue-50/50 dark:bg-blue-950/30 rounded-lg p-2 border border-blue-200/30 dark:border-blue-400/20">
                  <div className="font-semibold text-blue-600 dark:text-blue-400">
                    Nutrition
                  </div>
                  <div className="text-muted-foreground">Complete values</div>
                </div>
                <div className="bg-blue-50/50 dark:bg-blue-950/30 rounded-lg p-2 border border-blue-200/30 dark:border-blue-400/20">
                  <div className="font-semibold text-blue-600 dark:text-blue-400">
                    Ingredients
                  </div>
                  <div className="text-muted-foreground">Auto-parsed</div>
                </div>
                <div className="bg-blue-50/50 dark:bg-blue-950/30 rounded-lg p-2 border border-blue-200/30 dark:border-blue-400/20">
                  <div className="font-semibold text-blue-600 dark:text-blue-400">
                    Instructions
                  </div>
                  <div className="text-muted-foreground">Step-by-step</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Example 2: Ingredients Image Transformation */}
      <div className="mb-20">
        <div className="grid lg:grid-cols-5 gap-6 items-center">
          {/* Input: Ingredients Image */}
          <div className="lg:col-span-2 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-400/20 dark:from-blue-400/20 dark:to-blue-300/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
            <div className="relative bg-white/90 dark:bg-zinc-900/90 border-2 border-blue-200/50 dark:border-blue-400/30 rounded-3xl p-6 shadow-2xl backdrop-blur-sm hover:shadow-3xl transition-all duration-500 group-hover:scale-105">
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">Fresh Ingredients</h3>
                    <p className="text-sm text-muted-foreground">
                      What&apos;s in your fridge?
                    </p>
                  </div>
                </div>
                <div className="aspect-[4/5] bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/50 dark:to-blue-900/30 rounded-2xl overflow-hidden border-2 border-blue-200/30 dark:border-blue-400/20">
                  <Image
                    src="/images/ingredientsImage.jpg"
                    alt="Fresh vegetables including cucumbers, carrots, avocados, and lettuce in refrigerator"
                    width={500}
                    height={625}
                    quality={100}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
              <div className="text-xs text-muted-foreground text-center bg-blue-50/50 dark:bg-blue-950/30 rounded-lg p-2">
                <span className="font-medium">Upload:</span> Ingredient photos,
                fridge contents, pantry items
              </div>
            </div>
          </div>

          {/* Transformation Arrow */}
          <div className="lg:col-span-1 flex justify-center items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 rounded-full blur-lg opacity-30 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 p-6 rounded-full shadow-xl">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </div>
            {/* Mobile arrow (pointing down, next to sparkle) */}
            <div className="lg:hidden ml-4">
              <div className="flex flex-col items-center">
                <div className="w-0.5 h-12 bg-gradient-to-b from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300"></div>
                <div className="w-0 h-0 border-t-6 border-t-blue-600 dark:border-t-blue-400 border-l-3 border-l-transparent border-r-3 border-r-transparent"></div>
              </div>
            </div>
            {/* Desktop arrow (pointing right) */}
            <div className="hidden lg:block ml-4">
              <div className="flex items-center">
                <div className="w-12 h-0.5 bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300"></div>
                <div className="w-0 h-0 border-l-6 border-l-blue-600 dark:border-l-blue-400 border-t-3 border-t-transparent border-b-3 border-b-transparent"></div>
              </div>
            </div>
          </div>

          {/* Output: AI Generated Recipe from Ingredients */}
          <div className="lg:col-span-2 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-400/20 dark:from-blue-400/20 dark:to-blue-300/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
            <div className="relative bg-white/90 dark:bg-zinc-900/90 border-2 border-blue-200/50 dark:border-blue-400/30 rounded-3xl p-6 shadow-2xl backdrop-blur-sm hover:shadow-3xl transition-all duration-500 group-hover:scale-105">
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">
                      <span className="bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
                        Bubu AI
                      </span>{" "}
                      Suggests Recipe
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Fresh Garden Salad
                    </p>
                  </div>
                </div>
                <div className="aspect-[4/5] bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/50 dark:to-blue-900/30 rounded-2xl overflow-hidden border-2 border-blue-200/30 dark:border-blue-400/20">
                  <Image
                    src="/images/ingredientsImageOutput.png"
                    alt="AI generated fresh garden salad recipe with ingredients and nutrition info"
                    width={500}
                    height={625}
                    quality={100}
                    className="w-full h-full object-cover scale-101 hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs text-center">
                <div className="bg-blue-50/50 dark:bg-blue-950/30 rounded-lg p-2 border border-blue-200/30 dark:border-blue-400/20">
                  <div className="font-semibold text-blue-600 dark:text-blue-400">
                    Ingredients
                  </div>
                  <div className="text-muted-foreground">AI detected</div>
                </div>
                <div className="bg-blue-50/50 dark:bg-blue-950/30 rounded-lg p-2 border border-blue-200/30 dark:border-blue-400/20">
                  <div className="font-semibold text-blue-600 dark:text-blue-400">
                    Recipe
                  </div>
                  <div className="text-muted-foreground">Custom created</div>
                </div>
                <div className="bg-blue-50/50 dark:bg-blue-950/30 rounded-lg p-2 border border-blue-200/30 dark:border-blue-400/20">
                  <div className="font-semibold text-blue-600 dark:text-blue-400">
                    Nutrition
                  </div>
                  <div className="text-muted-foreground">Full analysis</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppFeaturesShowcase;
