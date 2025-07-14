import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BookOpen,
  CheckCircle,
  Heart,
  Search,
  ShoppingCart,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bubu AI - Your AI-Powered Recipe Builder",
  description:
    "Generate, manage, and discover delicious recipes with AI. Create custom menus, sync grocery lists, and explore endless culinary possibilities.",
};

const Home = async () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 -left-4 size-72 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-xl animate-float-1"></div>
        <div className="absolute top-0 -right-4 size-72 bg-blue-600/10 rounded-full mix-blend-multiply filter blur-xl animate-float-2"></div>
        <div className="absolute -bottom-8 left-20 size-72 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-xl animate-float-3"></div>
        <div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-300/5 rounded-full mix-blend-multiply filter blur-2xl animate-float-1"
          style={{ animationDelay: "10s" }}
        ></div>
        <div
          className="absolute bottom-1/4 right-1/4 size-80 bg-blue-500/15 rounded-full mix-blend-multiply filter blur-xl animate-float-2"
          style={{ animationDelay: "15s" }}
        ></div>
      </div>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto text-center relative min-h-screen py-20 px-4">
        {/* Main Hero Title with Bubu AI Emphasis */}
        <div className="mb-16">
          <h1 className="text-6xl md:text-8xl font-bold mb-4">
            <span className="relative inline-block">
              <span className="text-zinc-900 dark:text-white">Bubu</span>
              <span className="ml-3 bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent font-bold">
                AI
              </span>
              {/* Animated underline */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 rounded-full animate-pulse"></div>
            </span>
          </h1>

          <h2 className="text-3xl md:text-5xl font-semibold text-muted-foreground">
            Your Intelligent
            <span className="block bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
              AI-Powered Meal Planner
            </span>
          </h2>
        </div>

        <p className="text-xl md:text-2xl text-muted-foreground mb-20 max-w-4xl mx-auto leading-relaxed text-balance">
          Experience the future of cooking with{" "}
          <span className="font-semibold bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
            Bubu AI
          </span>
          . Generate personalized recipes, create intelligent meal plans, and
          discover endless culinary possibilities with our advanced AI
          technology.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
          <Link href="/bubu-ai">
            <Button
              size="lg"
              className="text-lg px-10 py-7 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white border-0 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <Zap className="size-6 mr-3" />
              Experience Bubu AI
            </Button>
          </Link>
        </div>
      </div>

      {/* App Features Showcase Collage */}
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
                      <h3 className="text-lg font-semibold">
                        Fresh Ingredients
                      </h3>
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
                  <span className="font-medium">Upload:</span> Ingredient
                  photos, fridge contents, pantry items
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

        {/* Example 3: Personalized Preferences */}
        <div className="mb-12">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
                Perfectly Tailored
              </span>{" "}
              to Your Preferences
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Set your dietary preferences, allergies, cooking time, and serving
              size once. Every recipe generated will be perfectly customized to
              your needs.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-400/20 dark:from-blue-400/20 dark:to-blue-300/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
              <div className="relative bg-white/90 dark:bg-zinc-900/90 border-2 border-blue-200/50 dark:border-blue-400/30 rounded-3xl p-6 shadow-2xl backdrop-blur-sm hover:shadow-3xl transition-all duration-500 group-hover:scale-105">
                <div className="mb-6">
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-semibold">
                      <span className="bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
                        Smart Preferences
                      </span>
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Set once, customize forever
                    </p>
                  </div>
                  <div className="aspect-[3/4] bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/50 dark:to-blue-900/30 rounded-2xl overflow-hidden border-2 border-blue-200/30 dark:border-blue-400/20">
                    <Image
                      src="/images/preferences.png"
                      alt="Bubu AI preferences interface showing dietary options, allergies, cooking time, serving size, and additional instructions"
                      width={600}
                      height={800}
                      quality={100}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs text-center">
                  <div className="bg-blue-50/50 dark:bg-blue-950/30 rounded-lg p-3 border border-blue-200/30 dark:border-blue-400/20">
                    <div className="font-semibold text-blue-600 dark:text-blue-400 mb-1">
                      Dietary Preferences
                    </div>
                    <div className="text-muted-foreground">
                      Vegan, Keto, Gluten-free & more
                    </div>
                  </div>
                  <div className="bg-blue-50/50 dark:bg-blue-950/30 rounded-lg p-3 border border-blue-200/30 dark:border-blue-400/20">
                    <div className="font-semibold text-blue-600 dark:text-blue-400 mb-1">
                      Allergy Management
                    </div>
                    <div className="text-muted-foreground">
                      Nuts, Shellfish, Dairy & more
                    </div>
                  </div>
                  <div className="bg-blue-50/50 dark:bg-blue-950/30 rounded-lg p-3 border border-blue-200/30 dark:border-blue-400/20">
                    <div className="font-semibold text-blue-600 dark:text-blue-400 mb-1">
                      Cooking Time
                    </div>
                    <div className="text-muted-foreground">
                      10-120 minutes range
                    </div>
                  </div>
                  <div className="bg-blue-50/50 dark:bg-blue-950/30 rounded-lg p-3 border border-blue-200/30 dark:border-blue-400/20">
                    <div className="font-semibold text-blue-600 dark:text-blue-400 mb-1">
                      Serving Size
                    </div>
                    <div className="text-muted-foreground">Custom portions</div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 dark:from-blue-950/50 dark:to-blue-900/30 rounded-xl p-4 border border-blue-200/30 dark:border-blue-400/20">
                    <div className="font-semibold text-blue-600 dark:text-blue-400 mb-2">
                      ✨ Additional Instructions
                    </div>
                    <div className="text-sm text-muted-foreground">
                      &ldquo;Low sodium, include protein alternatives, make it
                      spicy&rdquo;
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Feature Badges */}
        <div className="flex justify-center gap-4 flex-wrap">
          <div className="bg-white/90 dark:bg-zinc-900/90 border-2 border-blue-200/50 dark:border-blue-400/30 rounded-2xl p-4 shadow-xl backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <Sparkles className="size-5 text-blue-600 dark:text-blue-400" />
              <span className="font-semibold bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
                AI Powered Recognition
              </span>
            </div>
          </div>
          <div className="bg-white/90 dark:bg-zinc-900/90 border-2 border-green-200/50 dark:border-green-400/30 rounded-2xl p-4 shadow-xl backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <Heart className="size-5 text-green-600 dark:text-green-400" />
              <span className="font-semibold text-green-600 dark:text-green-400">
                Instant Nutrition Analysis
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Simple Stacked Collage */}
      <div className="relative w-full max-w-md mx-auto min-h-[500px] md:min-h-[600px]">
        {/* Search Layer */}
        <div className="absolute top-0 left-8 z-10">
          <div className="bg-white/95 dark:bg-zinc-900/95 border-2 border-blue-200/60 dark:border-blue-400/40 rounded-2xl shadow-xl backdrop-blur-sm overflow-hidden w-56 md:w-64 rotate-[-8deg]">
            <Image
              src="/images/search720x1500.jpeg"
              alt="Recipe search interface with smoothie results"
              width={720}
              height={1500}
              quality={100}
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Grocery List Layer */}
        <div className="absolute top-12 right-4 z-20">
          <div className="bg-white/95 dark:bg-zinc-900/95 border-2 border-blue-200/60 dark:border-blue-400/40 rounded-2xl shadow-xl backdrop-blur-sm overflow-hidden w-56 md:w-64 rotate-[6deg]">
            <Image
              src="/images/grocery720x1500.jpeg"
              alt="Smart grocery list with ingredient tracking"
              width={720}
              height={1500}
              quality={100}
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Menus Layer */}
        <div className="absolute top-24 left-12 z-30">
          <div className="bg-white/95 dark:bg-zinc-900/95 border-2 border-blue-200/70 dark:border-blue-400/50 rounded-2xl shadow-xl backdrop-blur-sm overflow-hidden w-52 md:w-60 rotate-[-4deg]">
            <Image
              src="/images/menus720x1500.jpeg"
              alt="Menu planning interface with organized meal categories"
              width={720}
              height={1500}
              quality={100}
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Recipes (Dark Theme) Layer */}
        <div className="absolute top-36 right-8 z-40">
          <div className="bg-white/95 dark:bg-zinc-900/95 border-2 border-blue-200/70 dark:border-blue-400/50 rounded-2xl shadow-xl backdrop-blur-sm overflow-hidden w-52 md:w-56 rotate-[3deg]">
            <Image
              src="/images/dark720x1500.jpeg"
              alt="Recipe collection with dark theme showing oatmeal cookies"
              width={720}
              height={1500}
              quality={100}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* Multi-Platform & Multi-Language Showcase */}
      <section className="py-24 px-4 bg-gradient-to-b from-blue-50/30 to-transparent dark:from-blue-950/20 dark:to-transparent text-balance rounded-t-lg">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
                Bubu AI
              </span>{" "}
              Works on Any Device,
              <span className="block text-3xl md:text-4xl mt-2">
                Understands Any Language
              </span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto ">
              Type your recipe requests in any language you&apos;re comfortable
              with.{" "}
              <span className="font-semibold bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
                Bubu AI
              </span>{" "}
              understands any language and works seamlessly across all your
              devices.
            </p>
          </div>

          {/* Multi-Language Showcase Carousel */}
          <div className="flex justify-center items-center">
            <div className="relative w-full max-w-sm mx-auto">
              {/* Carousel Container */}
              <div className="relative overflow-hidden rounded-3xl shadow-2xl border-4 border-blue-200/30 dark:border-blue-400/20 bg-white/10 dark:bg-zinc-900/10 backdrop-blur-sm">
                {/* Carousel Track */}
                <div className="flex animate-carousel">
                  {/* English Screenshot */}
                  <div className="w-full flex-shrink-0">
                    <div className="relative">
                      <Image
                        src="/images/english720x1500.jpg"
                        alt="Bubu AI generating recipe in English - Avocado and Strawberry Smoothie"
                        width={720}
                        height={1500}
                        quality={100}
                        className="w-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Italian Screenshot */}
                  <div className="w-full flex-shrink-0">
                    <div className="relative">
                      <Image
                        src="/images/italian720x1500.jpg"
                        alt="Bubu AI generating recipe in Italian - Lasagna con Prosciutto e Spinaci"
                        width={720}
                        height={1500}
                        quality={100}
                        className="w-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Spanish Screenshot */}
                  <div className="w-full flex-shrink-0">
                    <div className="relative">
                      <Image
                        src="/images/spanish720x1500.jpg"
                        alt="Bubu AI generating recipe in Spanish - Paella Mixta Tradicional"
                        width={720}
                        height={1500}
                        quality={100}
                        className="w-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Duplicate first image for seamless loop */}
                  <div className="w-full flex-shrink-0">
                    <div className="relative">
                      <Image
                        src="/images/english720x1500.jpg"
                        alt="Bubu AI generating recipe in English - Avocado and Strawberry Smoothie"
                        width={720}
                        height={1500}
                        quality={100}
                        className="w-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Gradient Overlays for Smooth Transitions */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-blue-600/5 to-transparent dark:from-blue-400/5 dark:to-transparent"></div>
                  <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-blue-600/5 to-transparent dark:from-blue-400/5 dark:to-transparent"></div>
                </div>
              </div>

              {/* Animated Dots Indicator */}
              <div className="flex justify-center mt-8 space-x-2">
                <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-dot-1"></div>
                <div className="w-2 h-2 bg-blue-300 dark:bg-blue-600 rounded-full animate-dot-2"></div>
                <div className="w-2 h-2 bg-blue-300 dark:bg-blue-600 rounded-full animate-dot-3"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-950/20 dark:to-transparent rounded-lg">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              Everything You Need for
              <span className="block bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-blue-600 dark:text-blue-400">
                Smart Cooking
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From AI recipe generation to grocery list management,{" "}
              <span className="font-semibold bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
                Bubu AI
              </span>{" "}
              has got your entire culinary journey covered.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* AI Recipe Generation */}
            <Card className="border-2 border-blue-200/50 dark:border-blue-400/20 hover:border-blue-400 dark:hover:border-blue-400 transition-all duration-300 hover:shadow-2xl group bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
              <CardHeader>
                <div className="w-14 h-14 bg-gradient-to-r from-blue-600/10 to-blue-400/10 dark:from-blue-400/10 dark:to-blue-300/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                  <Sparkles className="size-7" />
                </div>
                <CardTitle className="text-xl">
                  <span className="bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
                    Bubu AI
                  </span>{" "}
                  Recipe Generation
                </CardTitle>
                <CardDescription>
                  Generate detailed recipes with step-by-step instructions,
                  ingredients, and nutritional information using advanced AI.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• Detailed instructions</p>
                  <p>• Nutritional breakdown</p>
                  <p>• AI-generated images</p>
                  <p>• Ingredient image recognition</p>
                </div>
              </CardContent>
            </Card>

            {/* Recipe Management */}
            <Card className="border-2 border-blue-200/50 dark:border-blue-400/20 hover:border-blue-400 dark:hover:border-blue-400 transition-all duration-300 hover:shadow-2xl group bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
              <CardHeader>
                <div className="w-14 h-14 bg-gradient-to-r from-blue-600/10 to-blue-400/10 dark:from-blue-400/10 dark:to-blue-300/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                  <BookOpen className="size-7" />
                </div>
                <CardTitle className="text-xl">
                  Smart Recipe Management
                </CardTitle>
                <CardDescription>
                  Save, organize, and access your recipes with intelligent
                  categorization for different meal types and occasions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Breakfast</Badge>
                  <Badge variant="secondary">Lunch</Badge>
                  <Badge variant="secondary">Dinner</Badge>
                  <Badge variant="secondary">Other</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Menu Creation */}
            <Card className="border-2 border-blue-200/50 dark:border-blue-400/20 hover:border-blue-400 dark:hover:border-blue-400 transition-all duration-300 hover:shadow-2xl group bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
              <CardHeader>
                <div className="w-14 h-14 bg-gradient-to-r from-blue-600/10 to-blue-400/10 dark:from-blue-400/10 dark:to-blue-300/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                  <Heart className="size-7" />
                </div>
                <CardTitle className="text-xl">Custom Menu Planning</CardTitle>
                <CardDescription>
                  Create personalized menus for different occasions and add your
                  favorite recipes with AI-powered suggestions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• Weekly meal planning</p>
                  <p>• Special occasion menus</p>
                  <p>• Family favorites collection</p>
                </div>
              </CardContent>
            </Card>

            {/* Grocery List Sync */}
            <Card className="border-2 border-blue-200/50 dark:border-blue-400/20 hover:border-blue-400 dark:hover:border-blue-400 transition-all duration-300 hover:shadow-2xl group bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
              <CardHeader>
                <div className="w-14 h-14 bg-gradient-to-r from-blue-600/10 to-blue-400/10 dark:from-blue-400/10 dark:to-blue-300/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                  <ShoppingCart className="size-7" />
                </div>
                <CardTitle className="text-xl">
                  Intelligent Grocery Lists
                </CardTitle>
                <CardDescription>
                  Automatically sync ingredients from your recipes to organized
                  grocery lists with smart quantity management.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• Auto-ingredient sync</p>
                  <p>• Smart quantity tracking</p>
                  <p>• Completion tracking</p>
                </div>
              </CardContent>
            </Card>

            {/* Recipe Search */}
            <Card className="border-2 border-blue-200/50 dark:border-blue-400/20 hover:border-blue-400 dark:hover:border-blue-400 transition-all duration-300 hover:shadow-2xl group bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
              <CardHeader>
                <div className="w-14 h-14 bg-gradient-to-r from-blue-600/10 to-blue-400/10 dark:from-blue-400/10 dark:to-blue-300/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                  <Search className="size-7" />
                </div>
                <CardTitle className="text-xl">AI-Powered Search</CardTitle>
                <CardDescription>
                  Find recipes intelligently by ingredients, categories, dietary
                  preferences, or cooking time with advanced AI search.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>Search by: ingredients, categories, time, diet</p>
                </div>
              </CardContent>
            </Card>

            {/* Theme Customization */}
            <Card className="border-2 border-blue-200/50 dark:border-blue-400/20 hover:border-blue-400 dark:hover:border-blue-400 transition-all duration-300 hover:shadow-2xl group bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
              <CardHeader>
                <div className="w-14 h-14 bg-gradient-to-r from-blue-600/10 to-blue-400/10 dark:from-blue-400/10 dark:to-blue-300/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                  <Star className="size-7" />
                </div>
                <CardTitle className="text-xl">Beautiful Themes</CardTitle>
                <CardDescription>
                  Personalize your cooking experience with stunning dark and
                  light themes that adapt perfectly to your preference.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-background border-2 border-blue-200/50 dark:border-blue-400/30 rounded-xl shadow-sm"></div>
                  <div className="w-10 h-10 bg-foreground border-2 border-blue-200/50 dark:border-blue-400/30 rounded-xl shadow-sm"></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            Simple, Transparent
            <span className="block bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-blue-600 dark:text-blue-400">
              Pricing
            </span>
          </h2>
          <p className="text-xl text-muted-foreground mb-16">
            Start your culinary journey with{" "}
            <span className="font-semibold bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
              Bubu AI
            </span>{" "}
            today
          </p>

          <Card className="border-2 border-blue-200/50 dark:border-blue-400/20 max-w-lg mx-auto bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm shadow-2xl">
            <CardHeader className="text-center">
              {/* <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 rounded-2xl blur-lg opacity-30"></div>
                <div className="relative bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 rounded-2xl flex items-center justify-center w-full h-full">
                  <ChefHat className="w-10 h-10 text-white" />
                </div>
              </div> */}
              <CardTitle className="text-3xl">
                <span className="bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
                  Bubu AI
                </span>{" "}
              </CardTitle>
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent mb-2">
                $5.99
                <span className="text-lg text-muted-foreground font-normal">
                  /month
                </span>
              </div>
              <div className="text-sm text-muted-foreground mt-2">
                Or $4.99/month billed annually • Cancel anytime
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="size-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-lg">Recipe Generation with Images</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="size-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-lg">Dynamic Menu Planning</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="size-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-lg">Save Your Favorite Recipes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="size-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-lg">Smart Grocery List Sync</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="size-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-lg">Advanced Recipe Search</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="size-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-lg">Nutritional Information</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="size-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-lg">Ingredient image recognition</span>
                </div>
              </div>

              <Link href="/bubu-ai" className="block">
                <Button
                  className="w-full text-lg py-7 mt-8 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white border-0 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                  size="lg"
                >
                  <Zap className="size-5 mr-2" />
                  Get Started with Bubu AI
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 bg-gradient-to-r from-blue-600/10 via-blue-400/5 to-blue-300/10 dark:from-blue-600/20 dark:via-blue-400/10 dark:to-blue-300/20 rounded-t-lg text-balance">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            Ready to Transform Your
            <span className="block bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-blue-600 dark:text-blue-400">
              Cooking Experience?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground mb-16 max-w-3xl mx-auto">
            Join the home cooks who are already using{" "}
            <span className="font-semibold bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
              Bubu AI
            </span>{" "}
            to create amazing meals. Start your intelligent culinary adventure
            today.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/bubu-ai">
              <Button
                size="lg"
                className="text-lg px-10 py-7 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white border-0 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <Sparkles className="size-6 mr-3" />
                Start with Bubu AI
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 bg-gradient-to-b from-blue-50/30 to-transparent dark:from-blue-950/20 dark:to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-2xl font-bold">
                  <span className="text-zinc-900 dark:text-white">Bubu</span>
                  <span className="bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent ml-1">
                    AI
                  </span>
                </h3>
              </div>
              <p className="text-muted-foreground">
                Your AI-powered culinary assistant for endless recipe
                possibilities and intelligent cooking.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-blue-700 dark:text-blue-300">
                Features
              </h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>AI Recipe Generation</p>
                <p>Smart Menu Planning</p>
                <p>Intelligent Grocery Lists</p>
                <p>Advanced Recipe Search</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-blue-700 dark:text-blue-300">
                Support
              </h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>
                  <a
                    href="mailto:info@bubuaimealplanner.com"
                    className="underline font-semibold"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Contact our support team
                  </a>
                </p>
                <p>
                  <a
                    href="/privacy-policy"
                    className="underline font-semibold"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Privacy Policy
                  </a>
                </p>
                <a
                  href="/terms-of-service"
                  className="underline font-semibold"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-blue-200/50 dark:border-blue-400/20 mt-12 pt-8 text-center text-muted-foreground">
            <p>
              &copy; 2025{" "}
              <span className="font-semibold bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
                Bubu AI
              </span>
              . All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
